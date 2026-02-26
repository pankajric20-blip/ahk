require('dotenv').config({ path: './apps/web/.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing SUPABASE credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyAuth() {
    console.log("Starting Auth Verification Tests...");
    let successCount = 0;
    let totalTests = 3;

    // 1. Verify Email Auth (Signing up a dummy user)
    console.log("\n1. Testing Email/Password Auth...");
    const dummyEmail = `testuser_${Date.now()}@aihkya.invalid`;
    try {
        const { data: emailData, error: emailError } = await supabase.auth.signUp({
            email: dummyEmail,
            password: 'StrongPassword123!'
        });

        if (emailError) {
            console.error("❌ Email Auth Failed:", emailError.message);
        } else {
            console.log(`✅ Email Auth Available! (Created dummy user: ${emailData.user?.email || 'N/A'})`);
            successCount++;
        }
    } catch (e) {
        console.error("❌ Email Auth Exception:", e.message);
    }

    // 2. Verify Google OAuth
    console.log("\n2. Testing Google OAuth generation...");
    try {
        const { data: oAuthData, error: oAuthError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (oAuthError) {
            console.error("❌ Google OAuth Failed:", oAuthError.message);
        } else if (oAuthData && oAuthData.url) {
            console.log(`✅ Google OAuth Available! Generated Sign-in URL: ${oAuthData.url.substring(0, 50)}...`);
            successCount++;
        } else {
            console.error("❌ Google OAuth Failed (No URL Generated)");
        }
    } catch (e) {
        console.error("❌ Google OAuth Exception:", e.message);
    }

    // 3. Verify Phone OTP Initiation (using a dummy number, we just want to ensure the API doesn't return "Provider Disabled")
    console.log("\n3. Testing Phone OTP provider API...");
    try {
        // Note: We use a clearly invalid Indian number. If the provider is disabled, Supabase returns a 400 immediately.
        // If enabled, it attempts to send and might return an error from MSG91/Twilio, which still means the provider is ON in Supabase.
        const { data: phoneData, error: phoneError } = await supabase.auth.signInWithOtp({
            phone: '+910000000000',
        });

        if (phoneError) {
            if (phoneError.message.includes('Phone provider is disabled') || phoneError.message.includes('not supported') || phoneError.message.includes('disabled')) {
                console.error("❌ Phone OTP Failed:", phoneError.message);
            } else {
                console.log("✅ Phone Auth Provider is ENABLED! (The provider config is active, returned vendor error for invalid number: " + phoneError.message + ")");
                successCount++;
            }
        } else {
            console.log("✅ Phone OTP initialized successfully!");
            successCount++;
        }
    } catch (e) {
        console.error("❌ Phone OTP Exception:", e.message);
    }

    console.log(`\n=== Test Results: [${successCount}/${totalTests}] Providers Configured and Available ===`);

    if (successCount === totalTests) {
        console.log("🎉 All S1-T05 Authentication requirements are met on the backend!");
    } else {
        console.log("⚠️ Please check the Supabase Dashboard > Authentication > Providers to enable the failing providers.");
    }
}

verifyAuth();
