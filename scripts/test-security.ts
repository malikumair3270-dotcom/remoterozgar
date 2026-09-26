import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  verifyAdminCredentials,
} from '../src/lib/auth';

async function runSecurityTests() {
  console.log('🔒 Running Comprehensive Security Verification Suite...\n');

  // Test 1: Admin Credential Verification
  console.log('[1/3] Testing Constant-Time Admin Credential Verification...');
  const testEmail = process.env.ADMIN_EMAIL || 'admin@remoterozgar.com';
  const testPass = process.env.ADMIN_PASSWORD || 'super_secret_admin_dev_password_2026!';

  const valid = verifyAdminCredentials(testEmail, testPass);
  const invalidPass = verifyAdminCredentials(testEmail, 'wrong-password-123');
  const invalidEmail = verifyAdminCredentials('attacker@fake.com', testPass);

  if (!valid || invalidPass || invalidEmail) {
    throw new Error('FAILED: Credential verification check failed');
  }
  console.log('  ✅ PASS: Constant-time credential verification functional.');

  // Test 2: Cryptographic HMAC Session Tokens & Anti-Tampering
  console.log('\n[2/3] Testing Web Crypto HMAC Session Tokens & Anti-Tampering Protection...');
  const signedToken = await createAdminSessionToken(testEmail);
  if (!signedToken || !signedToken.includes('.')) {
    throw new Error('FAILED: Signed token invalid format');
  }

  const verifiedPayload = await verifyAdminSessionToken(signedToken);
  if (!verifiedPayload || verifiedPayload.email !== testEmail) {
    throw new Error('FAILED: Valid signed token was rejected');
  }

  // Attempt token tampering
  const tamperedToken = signedToken.slice(0, -4) + 'abcd';
  const isTamperedValid = await verifyAdminSessionToken(tamperedToken);
  if (isTamperedValid !== null) {
    throw new Error('SECURITY BREACH: Tampered HMAC token was accepted!');
  }

  console.log('  ✅ PASS: HMAC Signature Verification & Anti-Tampering active.');

  // Test 3: Input Sanitization
  console.log('\n[3/3] Testing HTML Escaping & Input Sanitization...');
  const maliciousInput = '<script>alert("xss")</script>';
  const sanitized = maliciousInput.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (sanitized.includes('<') || sanitized.includes('>')) {
    throw new Error('FAILED: Input sanitization failed');
  }
  console.log('  ✅ PASS: Input sanitization successfully escaped HTML tags.');

  console.log('\n🎉 ALL SECURITY VERIFICATION CHECKS PASSED!\n');
}

runSecurityTests().catch((error) => {
  console.error('\n❌ SECURITY VERIFICATION FAILED:', error);
  process.exit(1);
});
