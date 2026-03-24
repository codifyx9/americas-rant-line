export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last Updated: March 24, 2026</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">1. Introduction</h2>
            <p>America&rsquo;s Rant Line (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, phone hotline (1-888-460-RANT), and related services (collectively, the &ldquo;Service&rdquo;). By using the Service, you consent to the practices described in this policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">2. Information We Collect</h2>
            <p className="font-semibold text-white mt-2 mb-1">Information You Provide:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Phone Number:</strong> When you call our hotline, your phone number is automatically transmitted via Twilio. We store this to identify callers and prevent abuse.</li>
              <li><strong className="text-white">Voice Recordings:</strong> Your rant is recorded and stored on our servers. Approved rants are published publicly on our website.</li>
              <li><strong className="text-white">Payment Information:</strong> When purchasing a call code, your payment is processed by Stripe. We do not store your full credit card number, CVV, or billing address. We receive a transaction ID and confirmation from Stripe.</li>
              <li><strong className="text-white">Caller Profile:</strong> You may optionally provide a nickname, city, and state. This information is displayed alongside your published rant.</li>
              <li><strong className="text-white">Email Address:</strong> If provided during checkout, used for call code delivery and important service notices.</li>
            </ul>

            <p className="font-semibold text-white mt-4 mb-1">Information Collected Automatically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Usage Data:</strong> Pages visited, features used, time spent on the site, referral URLs, and clickstream data.</li>
              <li><strong className="text-white">Device Information:</strong> Browser type, operating system, device type, screen resolution, and IP address.</li>
              <li><strong className="text-white">Cookies &amp; Tracking:</strong> We use cookies and similar technologies for analytics, session management, and to remember your preferences.</li>
              <li><strong className="text-white">Call Metadata:</strong> Call duration, timestamp, line selected (MAGA/Blue/Neutral), and call status.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide, operate, and maintain the Service</li>
              <li>To process your payments and deliver call codes</li>
              <li>To publish approved rants on our website</li>
              <li>To display caller information (nickname, city, state) alongside published rants</li>
              <li>To compile leaderboards, statistics, and trending content</li>
              <li>To moderate content and enforce our Terms of Use and Community Guidelines</li>
              <li>To detect and prevent fraud, abuse, and unauthorized access</li>
              <li>To analyze usage patterns and improve the Service</li>
              <li>To send service-related communications (call code delivery, account notices)</li>
              <li>To comply with legal obligations and respond to legal requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">4. Public Content</h2>
            <p>When your rant is approved, the following information becomes publicly visible on our website:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your audio recording</li>
              <li>Your nickname (if provided, otherwise &ldquo;Anonymous&rdquo;)</li>
              <li>Your city and state (if provided)</li>
              <li>The line you called (MAGA, Blue, or Neutral)</li>
              <li>Vote counts, play counts, and ranking data</li>
            </ul>
            <p className="mt-2">Your phone number is <strong className="text-white">never</strong> displayed publicly. If you wish to have a published rant removed, contact us at americasrantline@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">5. Information Sharing &amp; Disclosure</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Service Providers:</strong> Twilio (telephony), Stripe (payments), and cloud hosting providers who assist in operating the Service, bound by contractual obligations to protect your data.</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, subpoena, court order, or government request.</li>
              <li><strong className="text-white">Safety:</strong> To protect the rights, property, or safety of America&rsquo;s Rant Line, our users, or the public.</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">6. Data Retention</h2>
            <p>We retain your information as follows:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Voice Recordings:</strong> Published rants are retained indefinitely unless you request removal. Rejected rants are deleted within 30 days.</li>
              <li><strong className="text-white">Caller Records:</strong> Phone numbers and profile data are retained for the life of your account.</li>
              <li><strong className="text-white">Payment Records:</strong> Transaction records are retained for 7 years for tax and legal compliance.</li>
              <li><strong className="text-white">Call Codes:</strong> Expired and used codes are purged after 90 days.</li>
              <li><strong className="text-white">Activity Logs:</strong> Server and activity logs are retained for 1 year.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">7. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including encrypted data transmission (TLS/SSL), secure database storage, access controls, and regular security audits. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">8. Your Rights &amp; Choices</h2>
            <p>Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong className="text-white">Opt-Out of Cookies:</strong> You can manage cookie preferences through your browser settings.</li>
              <li><strong className="text-white">Rant Removal:</strong> Request removal of a published rant by contacting us.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, email us at americasrantline@gmail.com with your request and sufficient information to verify your identity.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">9. California Residents (CCPA)</h2>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The right to know what personal information we collect and how it is used</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p className="mt-2">To exercise your CCPA rights, contact us at americasrantline@gmail.com or call 1-888-460-RANT.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">10. Children&rsquo;s Privacy</h2>
            <p>The Service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we learn that we have collected information from a child under 18, we will take steps to delete that information promptly. If you believe a minor has used our Service, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">11. Third-Party Links</h2>
            <p>The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on our website with an updated &ldquo;Last Updated&rdquo; date. Your continued use of the Service after changes are posted constitutes your acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">13. Contact Us</h2>
            <p>For privacy-related questions or requests, contact us at:</p>
            <p className="mt-2 text-white font-semibold">americasrantline@gmail.com</p>
            <p className="text-gray-500 mt-1">America&rsquo;s Rant Line &middot; 1-888-460-RANT</p>
          </section>
        </div>
      </div>
    </div>
  );
}
