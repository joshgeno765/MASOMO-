export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">Legal</p>
        <h1 className="font-serif text-3xl md:text-4xl text-navy mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: July 2026</p>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>
            Masomo Now is the francophone Africa division of <strong className="text-navy">ELIMU International Education
            Connections</strong>, a licensed Canadian education consultancy headquartered in Vancouver, BC. This policy
            explains what personal information we collect through masomonow.com, how we use it, and how you can contact
            us about it.
          </p>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">What we collect</h2>
            <p className="mb-3">We only collect information you choose to give us, through two forms on this site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consultation booking</strong> — your name, email, phone number, country, study destination interest, preferred appointment time, and any notes you add.</li>
              <li><strong>Pathway Finder</strong> — your quiz answers (home country, language preference, study goal, field of interest, budget, and timeline) and, only if you choose to save your result, your name, email, phone number, and an optional message.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">How we use it</h2>
            <p>
              We use this information to respond to your inquiry, match you to relevant study destinations and partner
              institutions, schedule and prepare for consultations, and keep an internal record of your file so our
              counselors can follow up appropriately. We do not use your information for advertising, and we do not sell
              personal information to anyone.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">Who can see it</h2>
            <p>
              Your information is accessible only to Masomo Now / ELIMU International Education Connections staff and
              our RCIC-licensed immigration team (License R731358) who are involved in supporting your inquiry. We use
              Resend, a transactional email provider, solely to deliver internal notifications when you submit a form —
              it is not used for marketing and does not receive your full record.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">Cookies and tracking</h2>
            <p>
              This site does not run advertising or analytics tracking cookies. Videos are embedded using YouTube's
              privacy-enhanced "nocookie" mode, which limits the use of cookies until you interact with a video player.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">How long we keep it</h2>
            <p>
              We retain your information for as long as necessary to support your inquiry or file, or as required by
              applicable record-keeping obligations. You can ask us to delete your information at any time using the
              contact details below, and we will do so unless we're required to keep it for a legitimate reason.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">Your rights</h2>
            <p>
              You can ask us to access, correct, or delete the personal information we hold about you at any time by
              emailing <a href="mailto:info@masomonow.com" className="text-brand-blue hover:underline">info@masomonow.com</a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">If you are under 18</h2>
            <p>
              Some of our seminars and inquiries involve secondary school students. If you are under 18, please involve
              a parent or guardian before submitting your information to us.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">Changes to this policy</h2>
            <p>
              We may update this policy from time to time as our services evolve. The "last updated" date above reflects
              the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-navy mb-3">Contact us</h2>
            <p>
              Questions about this policy or your information can be sent to{' '}
              <a href="mailto:info@masomonow.com" className="text-brand-blue hover:underline">info@masomonow.com</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
