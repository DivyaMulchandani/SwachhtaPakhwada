module.exports = [
"[project]/.next-internal/server/app/api/submit-quiz/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "initDatabase",
    ()=>initDatabase,
    "saveQuizResult",
    ()=>saveQuizResult
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Create a connection pool
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EIsUjH37fFez@ep-empty-firefly-adcac45z-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: {
        rejectUnauthorized: false
    }
});
async function initDatabase() {
    const client = await pool.connect();
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        enrollment_number VARCHAR(50) NOT NULL,
        course VARCHAR(100) NOT NULL,
        batch VARCHAR(100) NOT NULL,
        school VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Database table initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally{
        client.release();
    }
}
async function saveQuizResult(result) {
    const client = await pool.connect();
    try {
        const query = `
      INSERT INTO results (name, enrollment_number, course, batch, school, score)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
        const values = [
            result.name,
            result.enrollment_number,
            result.course,
            result.batch,
            result.school,
            result.score
        ];
        const res = await client.query(query, values);
        return res.rows[0].id;
    } catch (error) {
        console.error('Error saving quiz result:', error);
        throw error;
    } finally{
        client.release();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/quizData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "quizQuestions",
    ()=>quizQuestions
]);
const quizQuestions = [
    {
        id: 1,
        question: "Swachhata Pakhwada was launched under which national mission?",
        options: [
            "Digital India Mission",
            "Swachh Bharat Mission",
            "Cyber Security Mission",
            "National Health Mission"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "The primary aim of Swachhata Pakhwada is to:",
        options: [
            "Improve exam results",
            "Promote foreign investment",
            "Inspire citizens to adopt hygiene and cleanliness practices",
            "Encourage use of social media"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "Digital Data Cleaning mainly focuses on:",
        options: [
            "Deleting only images and videos",
            "Removing unnecessary, redundant, or corrupted data",
            "Formatting the entire hard drive",
            "Installing antivirus software"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "Which of the following is NOT a benefit of digital data cleaning?",
        options: [
            "Enhanced system performance",
            "Improved security",
            "Increased electricity consumption",
            "Efficient storage management"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        question: "Temporary files are created by:",
        options: [
            "Internet providers",
            "Operating system and applications",
            "Hackers",
            "Antivirus software"
        ],
        correctAnswer: 1
    },
    {
        id: 6,
        question: "Why is cleaning junk and temporary files important?",
        options: [
            "It increases storage space",
            "It prevents security risks",
            "It avoids application errors",
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        id: 7,
        question: "Which tool can be used in Windows for junk file cleaning?",
        options: [
            "Disk Cleanup / CCleaner",
            "BleachBit",
            "CleanMyMac",
            "JustDeleteMe"
        ],
        correctAnswer: 0
    },
    {
        id: 8,
        question: "On macOS, deleting unused language files is important because:",
        options: [
            "They can slow down the internet",
            "They take up unnecessary disk space",
            "They corrupt applications",
            "They remove system updates"
        ],
        correctAnswer: 1
    },
    {
        id: 9,
        question: "Which of the following is considered 'Risky' to clean in Linux BleachBit?",
        options: [
            "Cache",
            "Thumbnails",
            "Firefox Passwords",
            "System logs"
        ],
        correctAnswer: 2
    },
    {
        id: 10,
        question: "Cleaning your digital footprint involves:",
        options: [
            "Buying a new computer",
            "Deleting or deactivating old accounts",
            "Upgrading your RAM",
            "Installing antivirus"
        ],
        correctAnswer: 1
    },
    {
        "id": 11,
        "question": "Which activity is promoted during Swachhata Pakhwada in workplaces?",
        "options": [
            "Organizing cleanliness drives",
            "Installing new software",
            "Increasing online meetings",
            "Promoting gaming competitions"
        ],
        "correctAnswer": 0
    },
    {
        "id": 12,
        "question": "Which of the following is a common hygiene practice emphasized in Swachhata Pakhwada?",
        "options": [
            "Regular handwashing",
            "Watching TV",
            "Using social media",
            "Online shopping"
        ],
        "correctAnswer": 0
    },
    {
        "id": 13,
        "question": "Digital cleaning helps in:",
        "options": [
            "Reducing clutter on devices",
            "Slowing down the system",
            "Increasing battery consumption",
            "Deleting important files randomly"
        ],
        "correctAnswer": 0
    },
    {
        "id": 14,
        "question": "Which of these actions is discouraged for maintaining digital hygiene?",
        "options": [
            "Deleting temporary files",
            "Using strong passwords",
            "Clicking unknown email links",
            "Updating software regularly"
        ],
        "correctAnswer": 2
    },
    {
        "id": 15,
        "question": "The key message of Swachhata Pakhwada is to:",
        "options": [
            "Promote cleanliness and hygiene awareness",
            "Encourage online gaming",
            "Focus on advertisements",
            "Increase digital storage usage"
        ],
        "correctAnswer": 0
    }
];
}),
"[project]/src/app/api/submit-quiz/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quizData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quizData.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(request) {
    try {
        // Initialize database table if it doesn't exist
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initDatabase"])();
        const body = await request.json();
        const { answers, userDetails } = body;
        // Calculate score
        let score = 0;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quizData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quizQuestions"].forEach((question, index)=>{
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });
        // Save to database
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveQuizResult"])({
            name: userDetails.name,
            enrollment_number: userDetails.enrollmentNumber,
            course: userDetails.course,
            batch: userDetails.batch,
            school: userDetails.school,
            score: score
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            score,
            totalQuestions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quizData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quizQuestions"].length,
            percentage: Math.round(score / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quizData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quizQuestions"].length * 100),
            passed: score >= 11,
            resultId: result
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to submit quiz'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20f57a79._.js.map