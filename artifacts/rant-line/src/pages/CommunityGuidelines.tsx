export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Community Guidelines</h1>
        <p className="text-gray-500 text-sm mb-10">Last Updated: March 24, 2026</p>

        <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-6 mb-10">
          <p className="text-base text-gray-300 leading-relaxed">America&rsquo;s Rant Line is built on one principle: <strong className="text-white">every American has the right to speak their mind.</strong> We believe in free expression, passionate debate, and uncensored political speech. These guidelines exist not to silence you, but to keep the platform safe, legal, and focused on what matters &mdash; your voice.</p>
        </div>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83D\uDFE2"} What We Encourage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Passionate Political Opinions:</strong> Whether you love or hate the current administration, a policy, a party, or a politician &mdash; say it. That&rsquo;s what we&rsquo;re here for. Go hard.</li>
              <li><strong className="text-white">Strong Language:</strong> This is a rant line. Profanity is allowed. Express yourself however you naturally would. We don&rsquo;t censor swear words.</li>
              <li><strong className="text-white">Humor, Sarcasm &amp; Satire:</strong> Political comedy, impersonations, satirical takes &mdash; all welcome. Make America laugh (or cringe).</li>
              <li><strong className="text-white">Personal Stories:</strong> Share how policies affect your life, your family, your community. Real stories resonate.</li>
              <li><strong className="text-white">Disagreement &amp; Debate:</strong> You can disagree with anyone &mdash; other callers, politicians, the media, us. Disagreement is not harassment.</li>
              <li><strong className="text-white">Hot Takes:</strong> Unpopular opinions? Controversial stances? Bring them. The leaderboard rewards bold voices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83D\uDD34"} What Will Get Your Rant Rejected</h2>
            <p className="mb-3">We have a very short list of hard lines. We only reject content that crosses into illegal or dangerous territory:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Direct Threats of Violence:</strong> Specific, credible threats against identified individuals or groups. Saying &ldquo;politicians are ruining this country&rdquo; is fine. Saying &ldquo;I&rsquo;m going to [specific violent act] to [specific person]&rdquo; is not. We report credible threats to law enforcement.</li>
              <li><strong className="text-white">Doxxing:</strong> Sharing private personal information of non-public figures &mdash; home addresses, phone numbers, Social Security numbers, financial information. Public officials&rsquo; publicly available office contact info is acceptable.</li>
              <li><strong className="text-white">Child Exploitation:</strong> Any content involving the sexual exploitation of minors. Zero tolerance. Reported immediately to NCMEC and law enforcement.</li>
              <li><strong className="text-white">Incitement to Imminent Lawless Action:</strong> Directly inciting others to commit specific, imminent illegal acts (as defined by Brandenburg v. Ohio). General political rhetoric, even extreme, does not meet this threshold.</li>
              <li><strong className="text-white">Spam &amp; Fraud:</strong> Commercial solicitations, scam promotions, robocall-style recordings, or content unrelated to political expression.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\u26A0\uFE0F"} Things That Are Allowed (Even If Controversial)</h2>
            <p className="mb-3">To be crystal clear, the following types of content are <strong className="text-white">permitted</strong> on America&rsquo;s Rant Line:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Harsh criticism of any political party, politician, or public figure</li>
              <li>Conspiracy theories and alternative viewpoints</li>
              <li>Religious or anti-religious political commentary</li>
              <li>Criticism of government agencies, policies, and institutions</li>
              <li>Expressing anger, frustration, or outrage</li>
              <li>Using profanity and strong language</li>
              <li>Mocking, parody, and political satire</li>
              <li>Expressing opinions that others may find offensive or wrong</li>
              <li>Discussing immigration, guns, abortion, healthcare, taxes, and other divisive issues from any perspective</li>
            </ul>
            <p className="mt-3 text-gray-400 italic">We do not moderate based on political viewpoint. MAGA rants and Blue rants are held to the same standards.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83C\uDFAF"} The Three Lines</h2>
            <div className="space-y-3">
              <div className="bg-red-900/20 border border-red-800/40 rounded-lg p-4">
                <h3 className="font-black text-red-400 mb-1">{"\uD83D\uDD34"} MAGA Line (Conservative / Republican)</h3>
                <p>For conservative viewpoints, Republican politics, MAGA movement support, right-leaning commentary. You don&rsquo;t have to be a registered Republican &mdash; if your rant leans right, this is your line.</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-4">
                <h3 className="font-black text-blue-400 mb-1">{"\uD83D\uDD35"} Blue Line (Democrat / Progressive)</h3>
                <p>For progressive viewpoints, Democratic politics, left-leaning commentary, liberal perspectives. Whether you&rsquo;re a moderate Democrat or a democratic socialist, this is your line.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg p-4">
                <h3 className="font-black text-gray-300 mb-1">{"\u26AA"} Neutral Line (Independent / Open)</h3>
                <p>For independents, third-party supporters, centrists, or anyone who doesn&rsquo;t fit neatly into red or blue. Also for rants that criticize both sides equally or address non-partisan issues.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83D\uDDF3\uFE0F"} Voting &amp; Engagement</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Vote Honestly:</strong> Upvote rants you think are great, downvote ones you don&rsquo;t. Both are valid.</li>
              <li><strong className="text-white">No Bot Voting:</strong> Automated scripts, vote bots, or coordinated vote manipulation will result in vote resets and potential bans.</li>
              <li><strong className="text-white">Leaderboard Integrity:</strong> Rankings are based on genuine community engagement. We monitor for suspicious patterns and reserve the right to adjust scores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83D\uDEE1\uFE0F"} Moderation Process</h2>
            <p>Here&rsquo;s how your rant goes from phone call to published content:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li><strong className="text-white">You call and record</strong> your rant on one of the three lines.</li>
              <li><strong className="text-white">Your rant enters the moderation queue.</strong> Our team listens to confirm it doesn&rsquo;t violate the hard lines listed above.</li>
              <li><strong className="text-white">Approved rants go live</strong> on the website within 24 hours (usually much faster). Featured rants get priority review.</li>
              <li><strong className="text-white">Rejected rants</strong> are removed. If your rant is rejected, it&rsquo;s because it crossed one of the hard lines &mdash; not because we disagree with your politics.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\u274C"} Enforcement</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">First Offense:</strong> Rant rejected. No further action unless the content was severe.</li>
              <li><strong className="text-white">Repeated Violations:</strong> Future rants from your phone number may be automatically flagged for review.</li>
              <li><strong className="text-white">Severe Violations:</strong> Phone number permanently blocked. Content reported to law enforcement if legally required.</li>
              <li><strong className="text-white">Appeals:</strong> If you believe your rant was wrongly rejected, email americasrantline@gmail.com with your rant number.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">{"\uD83D\uDCAC"} Final Word</h2>
            <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-6">
              <p className="text-base text-gray-300 leading-relaxed">America&rsquo;s Rant Line exists because the country needs a place to yell. Left, right, center &mdash; everyone gets a mic. We don&rsquo;t fact-check your opinions. We don&rsquo;t tone-police your language. We don&rsquo;t care if your take is popular or unpopular. The only question is: <strong className="text-white">did you cross the line from speech into danger?</strong> If not, your rant gets published. Period.</p>
              <p className="mt-3 text-[#cc0000] font-black text-sm uppercase">America is arguing. Join the conversation.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-white uppercase mb-3">Contact</h2>
            <p>Questions about these guidelines? Contact us at:</p>
            <p className="mt-2 text-white font-semibold">americasrantline@gmail.com</p>
            <p className="text-gray-500 mt-1">America&rsquo;s Rant Line &middot; 1-888-460-RANT</p>
          </section>
        </div>
      </div>
    </div>
  );
}
