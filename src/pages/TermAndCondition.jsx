// pages/TermsAndConditions.jsx
import { motion } from "framer-motion";
import { FileText, Shield, AlertCircle, Scale, Clock, Mail, MessageCircle, MapPin } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
    content: `Welcome to Mozno Wealth ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your use of our website www.mozno.in and all related services, including but not limited to wealth management, financial planning, tax planning, insurance planning, borrowing solutions, and succession planning services (collectively, the "Services").

By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our Services.

Mozno Wealth is a comprehensive wealth management firm founded by Harshal Jain. We are registered with AMFI (ARN-338534) and APMI (APRN08037).`
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: Shield,
    content: `To use our Services, you must:

• Be at least 18 years of age
• Be a resident of India or an NRI eligible for investment in India
• Have the legal capacity to enter into binding contracts
• Provide accurate and complete information during registration
• Not be prohibited from receiving financial services under applicable laws

By using our Services, you represent and warrant that you meet all eligibility requirements. We reserve the right to refuse service to anyone for any reason at any time.`
  },
  {
    id: "services",
    title: "Our Services",
    icon: Scale,
    content: `Mozno Wealth provides the following services:

Wealth Management: Investment advisory and portfolio management including Mutual Funds, PMS, AIFs, Bonds, and Unlisted Shares.

Financial Planning: Goal-based personalized financial roadmaps aligned with your life milestones.

Tax Planning: Direct and indirect tax optimization strategies and filing assistance.

Insurance Planning: Life, health, and general insurance solutions for comprehensive protection.

Borrowing Solutions: Advisory services for home loans, personal loans, and business loans.

Succession Planning: Will drafting, estate planning, and trust services.

All services are provided in compliance with applicable regulations including AMFI guidelines.`
  },
  {
    id: "investment-risks",
    title: "Investment Risks & Disclaimer",
    icon: AlertCircle,
    content: `**IMPORTANT DISCLAIMER**

Investments in securities market are subject to market risks. Read all related documents carefully before investing.

• Past performance is not indicative of future returns
• The value of investments can go down as well as up
• There is no guarantee that investment objectives will be achieved
• Tax benefits are subject to changes in tax laws
• We do not guarantee any specific returns or outcomes

Mozno Wealth acts as a Mutual Fund Distributor (AMFI ARN-338534) and not as an Investment Advisor. Our role is to help you understand products and facilitate transactions based on your stated preferences.

You acknowledge that all investment decisions are made solely by you, and you are responsible for assessing the suitability of any investment based on your own financial situation and risk tolerance.`
  },
  {
    id: "user-obligations",
    title: "User Obligations",
    icon: FileText,
    content: `As a user of our Services, you agree to:

• Provide accurate, current, and complete information
• Maintain the confidentiality of your account credentials
• Notify us immediately of any unauthorized access
• Not use the Services for any unlawful purpose
• Not attempt to gain unauthorized access to our systems
• Not transmit any malicious code or harmful content
• Comply with all applicable laws and regulations
• Not misrepresent your identity or affiliation

You are solely responsible for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these obligations.`
  },
  {
    id: "fees",
    title: "Fees & Payments",
    icon: Scale,
    content: `**Fee Structure**

Our fees vary based on the services availed and are disclosed transparently before engagement. Fees may include:

• Advisory fees for financial planning services
• Commission on mutual fund and insurance products (as per applicable regulations)
• Service fees for tax filing and compliance services
• Consultation fees for specialized advisory

**Payment Terms**

• All fees are quoted in Indian Rupees (INR)
• Payment terms will be specified in individual service agreements
• Fees once paid are non-refundable unless otherwise specified
• We reserve the right to modify our fee structure with prior notice

All applicable taxes (GST) will be charged in addition to the stated fees.`
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    icon: Shield,
    content: `We are committed to maintaining the confidentiality of your personal and financial information.

• All client information is treated as strictly confidential
• We will not disclose your information to third parties except as required by law or with your consent
• Our employees and associates are bound by confidentiality agreements
• We implement appropriate security measures to protect your data

For detailed information on how we handle your data, please refer to our Privacy Policy.`
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: FileText,
    content: `All content on www.mozno.in, including but not limited to:

• Text, graphics, logos, and images
• Software, tools, and calculators
• Audio and video content
• Research reports and analysis
• Design elements and layouts

are the property of Mozno Wealth or its licensors and are protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works without our prior written consent. Limited use for personal, non-commercial purposes is permitted with proper attribution.`
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    icon: AlertCircle,
    content: `To the maximum extent permitted by law:

• Mozno Wealth shall not be liable for any indirect, incidental, special, consequential, or punitive damages
• Our total liability shall not exceed the fees paid by you in the preceding 12 months
• We are not responsible for losses arising from market fluctuations, investment decisions, or circumstances beyond our control
• We do not warrant that our Services will be uninterrupted or error-free

This limitation applies regardless of the theory of liability (contract, tort, negligence, or otherwise).`
  },
  {
    id: "termination",
    title: "Termination",
    icon: Clock,
    content: `By You: You may terminate your relationship with us at any time by providing written notice. Existing investments will continue as per the respective product terms.

By Us: We may suspend or terminate your access to our Services:
• For violation of these Terms
• For non-payment of fees
• As required by regulatory authorities
• For any other reason at our sole discretion

Upon termination, your right to use our Services ceases immediately. Provisions regarding intellectual property, limitation of liability, and dispute resolution survive termination.`
  },
  {
    id: "governing-law",
    title: "Governing Law & Disputes",
    icon: Scale,
    content: `**Governing Law**

These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.

**Dispute Resolution**

Any dispute arising out of or relating to these Terms shall be:

1. First attempted to be resolved through good-faith negotiation
2. If unresolved within 30 days, referred to arbitration under the Arbitration and Conciliation Act, 1996
3. Arbitration shall be conducted in Mumbai, Maharashtra
4. The language of arbitration shall be English
5. The decision of the arbitrator shall be final and binding

Courts in Mumbai, Maharashtra shall have exclusive jurisdiction for any matters not subject to arbitration.`
  },
  {
    id: "amendments",
    title: "Amendments",
    icon: FileText,
    content: `We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.

• We will notify you of significant changes via email or website notification
• Your continued use of Services after changes constitutes acceptance
• We encourage you to review these Terms periodically

Last updated: January 2025`
  }
];

export default function TermsAndConditions() {
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
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Legal</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 min-[375px]:mb-6 leading-tight">
              Terms &{" "}
              <span className="text-emerald-400">Conditions</span>
            </h1>

            {/* Description */}
            <p className="text-base min-[375px]:text-lg text-gray-300 leading-relaxed mb-6">
              Please read these terms carefully before using our services. 
              Your use of Mozno Wealth services indicates your acceptance of these terms.
            </p>

            {/* Last Updated */}
            <p className="text-sm text-gray-400">
              Last Updated: January 2025
            </p>
          </motion.div>
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
              href="#contact"
              className="text-sm font-medium text-emerald-600 whitespace-nowrap"
            >
              Contact Us
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
                      if (paragraph.match(/^\d\./)) {
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
      <section id="contact" className="py-12 min-[375px]:py-14 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl min-[375px]:rounded-3xl p-6 min-[375px]:p-8 sm:p-10 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 min-[375px]:mb-6">
              Contact Us
            </h2>
            <p className="text-sm min-[375px]:text-base text-gray-600 mb-6 min-[375px]:mb-8">
              If you have any questions about these Terms and Conditions, please contact us:
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

            {/* Registration Info */}
            <div className="mt-6 min-[375px]:mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs min-[375px]:text-sm text-gray-500">
                <strong>AMFI Registration:</strong> ARN-338534 | <strong>APMI:</strong> APRN08037
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}