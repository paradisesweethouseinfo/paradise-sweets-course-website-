const PASSWORD_STUDENT_DOMAIN =
  "students.paradisesweetsacademy.com";

const LOCAL_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
];

let cachedAccessToken = "";
let cachedAccessTokenExpiry = 0;

function corsHeaders(request) {
  const origin = request.headers.get("Origin");

  const allowedOrigin = LOCAL_ORIGINS.includes(origin)
    ? origin
    : LOCAL_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Methods":
      "GET, POST, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request),
      "Content-Type": "application/json",
    },
  });
}

function base64UrlEncode(value) {
  const bytes =
    typeof value === "string"
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function pemToArrayBuffer(pem) {
  const normalizedPem = pem.replace(/\\n/g, "\n");

  const base64 = normalizedPem
    .replace(
      "-----BEGIN PRIVATE KEY-----",
      ""
    )
    .replace(
      "-----END PRIVATE KEY-----",
      ""
    )
    .replace(/\s/g, "");

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

async function createServiceAccountJwt(env) {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    iss: env.FIREBASE_CLIENT_EMAIL,
    scope:
      "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const unsignedToken =
    `${base64UrlEncode(JSON.stringify(header))}.` +
    `${base64UrlEncode(JSON.stringify(payload))}`;

  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.FIREBASE_PRIVATE_KEY),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(unsignedToken)
  );

  return `${unsignedToken}.${base64UrlEncode(
    signature
  )}`;
}

async function getGoogleAccessToken(env) {
  const currentTime = Date.now();

  if (
    cachedAccessToken &&
    currentTime < cachedAccessTokenExpiry
  ) {
    return cachedAccessToken;
  }

  const assertion =
    await createServiceAccountJwt(env);

  const response = await fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type:
          "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error(
      "Google access token error:",
      result
    );

    throw new Error(
      result.error_description ||
        "Unable to create Google access token."
    );
  }

  cachedAccessToken = result.access_token;

  cachedAccessTokenExpiry =
    currentTime +
    Math.max(
      (Number(result.expires_in) - 300) * 1000,
      60000
    );

  return cachedAccessToken;
}

async function verifyFirebaseIdToken(idToken, env) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    }
  );

  const result = await response.json();

  if (
    !response.ok ||
    !Array.isArray(result.users) ||
    !result.users[0]?.localId
  ) {
    throw new Error("invalid-firebase-token");
  }

  return result.users[0];
}

async function getFirestoreDocument(
  env,
  accessToken,
  documentPath
) {
  const url =
    `https://firestore.googleapis.com/v1/projects/` +
    `${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/` +
    documentPath;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 404) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    console.error(
      "Firestore read error:",
      result
    );

    throw new Error(
      result.error?.message ||
        "Unable to read Firestore."
    );
  }

  return result;
}

async function verifyAdministrator(request, env) {
  const authorization =
    request.headers.get("Authorization") || "";

  if (!authorization.startsWith("Bearer ")) {
    throw new Error("missing-admin-token");
  }

  const idToken = authorization
    .slice(7)
    .trim();

  if (!idToken) {
    throw new Error("missing-admin-token");
  }

  const firebaseUser =
    await verifyFirebaseIdToken(idToken, env);

  const accessToken =
    await getGoogleAccessToken(env);

  const adminDocument =
    await getFirestoreDocument(
      env,
      accessToken,
      "admins/admin1"
    );

  if (!adminDocument) {
    throw new Error("admin-record-not-found");
  }

  const adminUid =
    adminDocument.fields?.uid?.stringValue;

  const adminActive =
    adminDocument.fields?.active?.booleanValue;

  if (
    adminActive !== true ||
    adminUid !== firebaseUser.localId
  ) {
    throw new Error(
      "administrator-access-denied"
    );
  }

  return {
    firebaseUser,
    accessToken,
  };
}

function normalizeStudentId(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function normalizeCourses(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value
        .map((course) =>
          String(course || "").trim()
        )
        .filter(Boolean)
    ),
  ];
}

function firestoreArray(values) {
  return {
    arrayValue: {
      values: values.map((value) => ({
        stringValue: value,
      })),
    },
  };
}

function createStudentFields({
  studentId,
  name,
  email = "",
  uid = "",
  loginMethod,
  active,
  courses,
}) {
  const fields = {
    studentId: {
      stringValue: studentId,
    },
    name: {
      stringValue: name,
    },
    loginMethod: {
      stringValue: loginMethod,
    },
    active: {
      booleanValue: active,
    },
    courses: firestoreArray(courses),
    createdAt: {
      timestampValue: new Date().toISOString(),
    },
    updatedAt: {
      timestampValue: new Date().toISOString(),
    },
  };

  if (email) {
    fields.email = {
      stringValue: email,
    };
  }

  if (uid) {
    fields.uid = {
      stringValue: uid,
    };
  }

  return fields;
}

async function createFirestoreStudent(
  env,
  accessToken,
  studentId,
  fields
) {
  const url =
    `https://firestore.googleapis.com/v1/projects/` +
    `${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/students` +
    `?documentId=${encodeURIComponent(studentId)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(
      "Firestore create error:",
      result
    );

    throw new Error(
      result.error?.message ||
        "Unable to create student document."
    );
  }

  return result;
}

async function studentDocumentExists(
  env,
  accessToken,
  studentId
) {
  const document =
    await getFirestoreDocument(
      env,
      accessToken,
      `students/${encodeURIComponent(
        studentId
      )}`
    );

  return document !== null;
}

async function createFirebasePasswordUser(
  env,
  email,
  password
) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const firebaseMessage =
      result.error?.message || "";

    if (
      firebaseMessage.includes(
        "EMAIL_EXISTS"
      )
    ) {
      throw new Error(
        "An Authentication account already exists for this Student ID."
      );
    }

    if (
      firebaseMessage.includes(
        "OPERATION_NOT_ALLOWED"
      )
    ) {
      throw new Error(
        "Email/Password sign-in is not enabled in Firebase Authentication."
      );
    }

    throw new Error(
      firebaseMessage ||
        "Unable to create Firebase Authentication user."
    );
  }

  return result;
}

async function deleteNewFirebaseUser(
  env,
  idToken
) {
  if (!idToken) {
    return;
  }

  await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${env.FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    }
  );
}

async function createPasswordStudent(
  request,
  env,
  accessToken
) {
  const body = await request.json();

  const studentId =
    normalizeStudentId(body.studentId);

  const name = String(body.name || "").trim();
  const password = String(
    body.password || ""
  );

  const active = body.active !== false;

  const courses =
    normalizeCourses(body.courses);

  if (!studentId) {
    return jsonResponse(
      request,
      {
        success: false,
        message: "Student ID is required.",
      },
      400
    );
  }

  if (!/^[A-Za-z0-9_-]+$/.test(studentId)) {
    return jsonResponse(
      request,
      {
        success: false,
        message:
          "Student ID can contain only letters, numbers, hyphens and underscores.",
      },
      400
    );
  }

  if (!name) {
    return jsonResponse(
      request,
      {
        success: false,
        message: "Student name is required.",
      },
      400
    );
  }

  if (password.length < 6) {
    return jsonResponse(
      request,
      {
        success: false,
        message:
          "Password must contain at least 6 characters.",
      },
      400
    );
  }

  if (
    await studentDocumentExists(
      env,
      accessToken,
      studentId
    )
  ) {
    return jsonResponse(
      request,
      {
        success: false,
        message:
          "This Student ID already exists.",
      },
      409
    );
  }

  const internalEmail =
    `${studentId}@${PASSWORD_STUDENT_DOMAIN}`;

  let createdAuthUser = null;

  try {
    createdAuthUser =
      await createFirebasePasswordUser(
        env,
        internalEmail,
        password
      );

    const fields = createStudentFields({
      studentId,
      name,
      uid: createdAuthUser.localId,
      loginMethod: "password",
      active,
      courses,
    });

    await createFirestoreStudent(
      env,
      accessToken,
      studentId,
      fields
    );

    return jsonResponse(
      request,
      {
        success: true,
        message:
          "Password student created successfully.",
        student: {
          studentId,
          name,
          uid: createdAuthUser.localId,
          loginMethod: "password",
          active,
          courses,
        },
      },
      201
    );
  } catch (error) {
    if (createdAuthUser?.idToken) {
      try {
        await deleteNewFirebaseUser(
          env,
          createdAuthUser.idToken
        );
      } catch (rollbackError) {
        console.error(
          "Authentication rollback error:",
          rollbackError
        );
      }
    }

    throw error;
  }
}

async function createGoogleStudent(
  request,
  env,
  accessToken
) {
  const body = await request.json();

  const studentId =
    normalizeStudentId(body.studentId);

  const name = String(body.name || "").trim();

  const email =
    normalizeEmail(body.email);

  const active = body.active !== false;

  const courses =
    normalizeCourses(body.courses);

  if (!studentId) {
    return jsonResponse(
      request,
      {
        success: false,
        message: "Student ID is required.",
      },
      400
    );
  }

  if (!name) {
    return jsonResponse(
      request,
      {
        success: false,
        message: "Student name is required.",
      },
      400
    );
  }

  if (
    !email.endsWith("@gmail.com") ||
    email.length <= "@gmail.com".length
  ) {
    return jsonResponse(
      request,
      {
        success: false,
        message:
          "Enter a valid Gmail address.",
      },
      400
    );
  }

  if (
    await studentDocumentExists(
      env,
      accessToken,
      studentId
    )
  ) {
    return jsonResponse(
      request,
      {
        success: false,
        message:
          "This Student ID already exists.",
      },
      409
    );
  }

  const fields = createStudentFields({
    studentId,
    name,
    email,
    loginMethod: "google",
    active,
    courses,
  });

  await createFirestoreStudent(
    env,
    accessToken,
    studentId,
    fields
  );

  return jsonResponse(
    request,
    {
      success: true,
      message:
        "Google student added successfully.",
      student: {
        studentId,
        name,
        email,
        loginMethod: "google",
        active,
        courses,
      },
    },
    201
  );
}

async function handleRequest(request, env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }

  if (
    request.method === "GET" &&
    url.pathname === "/"
  ) {
    return jsonResponse(request, {
      success: true,
      message:
        "Paradise Sweets Academy Admin API is running.",
    });
  }

  if (
    request.method === "GET" &&
    url.pathname === "/health"
  ) {
    return jsonResponse(request, {
      success: true,
      service:
        "paradise-academy-admin-api",
    });
  }

  const { accessToken } =
    await verifyAdministrator(request, env);

  if (
    request.method === "POST" &&
    url.pathname === "/students/password"
  ) {
    return createPasswordStudent(
      request,
      env,
      accessToken
    );
  }

  if (
    request.method === "POST" &&
    url.pathname === "/students/google"
  ) {
    return createGoogleStudent(
      request,
      env,
      accessToken
    );
  }

  return jsonResponse(
    request,
    {
      success: false,
      message: "API route not found.",
    },
    404
  );
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error("Worker error:", error);

      const authorizationErrors = [
        "missing-admin-token",
        "invalid-firebase-token",
        "admin-record-not-found",
        "administrator-access-denied",
      ];

      const status =
        authorizationErrors.includes(
          error.message
        )
          ? 401
          : 500;

      return jsonResponse(
        request,
        {
          success: false,
          message:
            status === 401
              ? "Administrator authorization failed."
              : error.message ||
                "Internal server error.",
          code:
            error.message ||
            "unknown-error",
        },
        status
      );
    }
  },
};