// pages/PrivacyPolicy.jsx
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Share2, UserCheck, Bell, Settings, Mail, MessageCircle, MapPin } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Shield,
    content: `Mozno Wealth ("Company", "we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.mozno.in and use our wealth management services.

We are a comprehensive wealth management firm founded by Harshal Jain and registered with AMFI (ARN-338534) and APMI (APRN08037). We operate in compliance with applicable Indian laws including the Information Technology Act, 2000 and its rules.

Please read this Privacy Policy carefully. By using our Services, you consent to the collection and use of your information as described herein.`
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    icon: Database,
    content: `**Personal Information**

We collect information that you provide directly to us:

• **Identity Information**: Full name, date of birth, gender, PAN, Aadhaar (as required by KYC norms), photographs
• **Contact Information**: Email address, phone numbers, residential address
• **Financial Information**: Bank account details, income details, investment history, tax returns, existing investments
• **Employment Information**: Occupation, employer details, professional qualifications
• **Family Information**: Spouse and nominee details, dependents information
• **Risk Profile Data**: Investment objectives, risk tolerance, time horizon

**Automatically Collected Information**

When you visit our website, we may collect:

• **Device Information**: IP address, browser type, operating system
• **Usage Data**: Pages visited, time spent, click patterns
• **Cookies and Tracking**: Session data, preferences, analytics

**Third-Party Information**

We may receive information from:

• KYC Registration Agencies (KRAs)
• Credit information companies
• Government databases for verification
• Financial institutions and mutual fund houses`
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: Settings,
    content: `We use your information for the following purposes:

**Service Delivery**
• Processing your investment and financial planning requests
• Providing personalized wealth management advice
• Executing transactions on your behalf
• Preparing tax returns and compliance documents

**Communication**
• Sending transaction confirmations and account statements
• Providing investment updates and market insights
• Responding to your inquiries and requests
• Sending newsletters and educational content (with consent)

**Legal & Regulatory Compliance**
• Fulfilling KYC/AML requirements
• Reporting to AMFI and other regulatory bodies as required by law
• Maintaining records as required by law
• Responding to legal requests and preventing fraud

**Business Improvement**
• Analyzing usage patterns to improve our services
• Conducting research and analytics
• Developing new products and features
• Training our team members`
  },
  {
    id: "data-sharing",
    title: "Information Sharing & Disclosure",
    icon: Share2,
    content: `We do not sell your personal information. We may share your information only in the following circumstances:

**With Your Consent**
• When you explicitly authorize us to share information
• For referrals to partner institutions at your request

**Service Providers**
• Asset Management Companies (AMCs) for mutual fund transactions
• Insurance companies for policy processing
• Banks for loan applications
• Technology providers for secure data storage

**Regulatory & Legal Requirements**
• AMFI and other regulatory bodies as required by regulations
• Income Tax Department for compliance
• Courts and law enforcement when legally mandated
• KYC Registration Agencies (KRAs)

**Business Transfers**
• In case of merger, acquisition, or sale of assets
• With appropriate confidentiality safeguards

All third parties are bound by confidentiality agreements and are required to use your information only for specified purposes.`
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: `We implement robust security measures to protect your information:

**Technical Safeguards**
• SSL/TLS encryption for data transmission
• Encrypted storage of sensitive information
• Secure server infrastructure with firewalls
• Regular security audits and vulnerability assessments
• Multi-factor authentication for account access

**Organizational Measures**
• Access controls limiting data access to authorized personnel
• Employee training on data protection
• Confidentiality agreements with all staff
• Incident response procedures

**Physical Security**
• Secure office premises with restricted access
• Protected document storage
• Secure disposal of physical records

Despite our efforts, no security measure is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any breach.`
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: Database,
    content: `We retain your information for as long as necessary to:

• Provide our services to you
• Comply with legal and regulatory requirements
• Resolve disputes and enforce agreements
• Maintain business records

**Retention Periods**

• **Active Client Data**: Throughout the client relationship and 8 years thereafter
• **Transaction Records**: 10 years as required by applicable regulations
• **Tax-related Documents**: 8 years from the relevant assessment year
• **KYC Documents**: 5 years after the end of business relationship
• **Website Analytics**: 3 years

After the retention period, data is securely deleted or anonymized.`
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: UserCheck,
    content: `You have the following rights regarding your personal information:

**Right to Access**
• Request a copy of your personal data held by us
• Obtain information about how your data is processed

**Right to Correction**
• Request correction of inaccurate or incomplete data
• Update your personal information at any time

**Right to Deletion**
• Request deletion of your data (subject to legal retention requirements)
• Withdraw consent for optional data processing

**Right to Object**
• Opt-out of marketing communications
• Object to certain types of data processing

**Right to Portability**
• Receive your data in a structured, machine-readable format
• Transfer data to another service provider

To exercise these rights, contact us at ceo@mozno.in. We will respond within 30 days.`
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Eye,
    content: `**What Are Cookies?**

Cookies are small text files stored on your device when you visit our website.

**Types of Cookies We Use**

• **Essential Cookies**: Required for website functionality
• **Analytics Cookies**: Help us understand website usage (Google Analytics)
• **Preference Cookies**: Remember your settings and preferences

**Managing Cookies**

You can control cookies through your browser settings:
• Block all cookies
• Delete existing cookies
• Allow only certain cookies

Note: Disabling cookies may affect website functionality.

**Third-Party Analytics**

We use Google Analytics to understand website traffic. Google's privacy policy applies to data collected by their services.`
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    icon: Share2,
    content: `Our website may contain links to third-party websites:

• Mutual fund company websites
• Insurance provider portals
• Government websites (Income Tax, etc.)
• Social media platforms

**Important Notice**

We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.

When you click on third-party links, you leave our website and are subject to their terms and policies.`
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: Shield,
    content: `Our Services are not intended for individuals under 18 years of age.

We do not knowingly collect personal information from minors. If we learn that we have collected data from a child under 18, we will promptly delete such information.

For minor beneficiaries in succession planning, information is collected from their legal guardians with appropriate consent.

If you believe a minor has provided us with personal information, please contact us immediately.`
  },
  {
    id: "updates",
    title: "Policy Updates",
    icon: Bell,
    content: `We may update this Privacy Policy from time to time to reflect:

• Changes in our practices
• New regulatory requirements
• Improvements to our services
• Feedback from users

**Notification of Changes**

• We will post the updated policy on this page
• The "Last Updated" date will be revised
• For significant changes, we will notify you via email
• Continued use after changes constitutes acceptance

We encourage you to review this policy periodically.

**Last Updated**: January 2025`
  },
  {
    id: "grievance",
    title: "Grievance Officer",
    icon: UserCheck,
    content: `In accordance with the Information Technology Act, 2000 and rules made thereunder, we have appointed a Grievance Officer:

**Grievance Officer Details**

Name: Harshal Jain
Email: ceo@mozno.in
WhatsApp: https://wa.me/919820507696

Address:
Mozno Advisory
106, Shyamkamal 'C' Building, Agarwal Market,
Vile Parle East, Mumbai - 400 057

**Response Time**

We will acknowledge your complaint within 48 hours and resolve it within 30 days from the date of receipt.`
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-[375px]:py-20 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Your Privacy Matters</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 min-[375px]:mb-6 leading-tight">
              Privacy{" "}
              <span className="text-emerald-400">Policy</span>
            </h1>

            {/* Description */}
            <p className="text-base min-[375px]:text-lg text-gray-300 leading-relaxed mb-6">
              We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
            </p>

            {/* Last Updated */}
            <p className="text-sm text-gray-400">
              Last Updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 min-[375px]:py-10 sm:py-12 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg min-[375px]:text-xl font-bold text-gray-900 mb-2">
              Privacy at a Glance
            </h2>
            <p className="text-sm text-gray-600">Key points about how we handle your data</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-[375px]:gap-4">
            {[
              { icon: Lock, text: "Bank-grade encryption" },
              { icon: Eye, text: "No data selling" },
              { icon: Shield, text: "Regulatory-compliant" },
              { icon: UserCheck, text: "Your data, your control" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-3 min-[375px]:p-4 bg-white rounded-xl border border-emerald-100"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-2">
                  <item.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-xs min-[375px]:text-sm font-medium text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-hide">
            {sections.slice(0, 6).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 whitespace-nowrap transition-colors"
              >
                {section.title}
              </a>
            ))}
            <span className="text-gray-300">•</span>
            <a
              href="#grievance"
              className="text-sm font-medium text-emerald-600 whitespace-nowrap"
            >
              Grievance Officer
            </a>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 min-[375px]:py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 min-[375px]:space-y-12 sm:space-y-14">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="scroll-mt-24"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4 min-[375px]:mb-5">
                  <div className="w-10 h-10 min-[375px]:w-11 min-[375px]:h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 min-[375px]:w-5.5 min-[375px]:h-5.5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="prose prose-gray max-w-none">
                  <div className="text-sm min-[375px]:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n').map((paragraph, i) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={i} className="text-base min-[375px]:text-lg font-semibold text-gray-900 mt-4 mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('•')) {
                        return (
                          <p key={i} className="ml-4 my-1">
                            {paragraph}
                          </p>
                        );
                      }
                      return paragraph ? (
                        <p key={i} className="my-3">
                          {paragraph}
                        </p>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 min-[375px]:py-14 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl min-[375px]:rounded-3xl p-6 min-[375px]:p-8 sm:p-10 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 min-[375px]:mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-sm min-[375px]:text-base text-gray-600 mb-6 min-[375px]:mb-8">
              If you have any questions or concerns about our Privacy Policy or data practices, please contact us:
            </p>

            <div className="grid gap-4 min-[375px]:gap-5 sm:gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3 min-[375px]:gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a href="mailto:ceo@mozno.in" className="text-sm text-emerald-600 hover:underline">
                    ceo@mozno.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 min-[375px]:gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <a href="https://wa.me/919820507696" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 min-[375px]:gap-4 sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    Mozno Advisory<br />
                    106, Shyamkamal 'C' Building, Agarwal Market,<br />
                    Vile Parle East, Mumbai - 400 057
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Info */}
            <div className="mt-6 min-[375px]:mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs min-[375px]:text-sm text-gray-500">
                <strong>AMFI Registration:</strong> ARN-338534 | <strong>APMI:</strong> APRN08037
              </p>
              <p className="text-xs text-gray-400 mt-2">
                As per applicable regulatory guidelines.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}