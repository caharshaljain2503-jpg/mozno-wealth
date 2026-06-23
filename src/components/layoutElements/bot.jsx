// import React, { useState, useRef, useEffect } from 'react';
// import { Bot, User, X, Home, DollarSign, TrendingUp, Shield, FileText, Phone, ChevronRight, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const Aibot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [suggestedQuestions, setSuggestedQuestions] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Predefined knowledge base (specific keys before generic 'services' so e.g. "Tax planning services" matches tax, not services)
//   const knowledgeBase = {
//     'wealth management': {
//       answer: `Our Wealth Management includes:

// • Mutual Funds (ARN-338534) - SIPs & lumpsum investments
// • Portfolio Management Services (PMS) - Customized portfolios
// • Alternative Investment Funds (AIFs) - HNI opportunities
// • Bonds & Debt Instruments - Fixed income solutions
// • Unlisted Shares - Pre-IPO opportunities

// 📈 Average returns: 12-18% annually
// 💰 Minimum investment: ₹50,000
// 🔄 Portfolio review: Quarterly`,
//       followUp: ['Mutual fund options', 'Minimum investment', 'Free consultation', 'Contact details']
//     },

//     'tax': {
//       answer: `Our Tax Planning Services:

// 📋 Income Tax Filing - Individual & business returns
// 💼 GST Compliance - Monthly/quarterly returns
// 🌐 International Taxation - DTAA, transfer pricing
// 🏢 Corporate Tax Planning - Optimization strategies
// 📊 Tax Audit Support - Authority representation

// 💰 Average tax savings: 20-35% for clients
// ⏱️ Turnaround time: 24-48 hours for filing`,
//       followUp: ['Tax filing fees', 'GST services', 'Free consultation', 'Contact us']
//     },

//     'financial planning': {
//       answer: `Financial Planning Process:

// 1️⃣ Goal Analysis - Retirement, education, home purchase
// 2️⃣ Risk Assessment - Profile evaluation
// 3️⃣ Asset Allocation - Customized portfolio
// 4️⃣ Implementation - Investment execution
// 5️⃣ Monitoring - Quarterly reviews

// 🎯 Specialized Plans:
// • Retirement Planning (NPS, EPF, PPF)
// • Child Education Planning
// • Wealth Accumulation Strategies`,
//       followUp: ['Retirement planning', 'Investment options', 'Fees structure', 'Book consultation']
//     },

//     'insurance': {
//       answer: `Insurance Solutions:

// 🛡️ Life Insurance - Term, ULIPs, endowment
// 🏥 Health Insurance - Individual, family floater
// 🚗 General Insurance - Motor, property, liability
// 🏢 Business Insurance - Key person, indemnity

// 🔍 Our Approach:
// • Needs-based recommendation
// • Policy comparison from top insurers
// • Claims assistance support
// • Annual policy review

// 💰 Average premium savings: 15-25%`,
//       followUp: ['Health insurance', 'Term insurance', 'Compare policies', 'Get quote']
//     },

//     'fees': {
//       answer: `Transparent Fee Structure:

// 1. Wealth Management: 0.5%-1.5% annually
// 2. Financial Planning: ₹15,000 - ₹1,00,000+
// 3. Tax Filing: ₹2,500 - ₹25,000
// 4. Insurance Advisory: Fee-only model
// 5. Borrowing Solutions: No client fees
// 6. Succession Planning: Custom quote

// ✅ 100% Free Initial Consultation
// ✅ No hidden charges
// ✅ All fees discussed upfront`,
//       followUp: ['Free consultation', 'Wealth management fees', 'Tax filing cost', 'Contact us']
//     },

//     'contact': {
//       answer: `Contact Mozno Wealth:

// 💬 WhatsApp: https://wa.me/919820507696

// 📧 Email: ceo@mozno.in

// 📍 Address: C, 106, Shyam Kamal Rd, next to Rajwadi Chai, above IIFL Office, Agarwal Market, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057

// 📅 Free Consultation: 30 minutes with our team
// ⚡ Response Time: Within 2 hours`,
//       followUp: ['Book consultation', 'Our services', 'Fee structure', 'About team']
//     },

//     'minimum': {
//       answer: `Investment Minimums:

// 💰 Wealth Management: ₹50,000 lumpsum
//     (or SIP of ₹5,000/month)

// 📊 Financial Planning: No minimum
// 📋 Tax Services: No minimum
// 🛡️ Insurance: Starting ₹500/month

// 💡 For Beginners: Start with ₹5,000/month SIP
// 📈 For HNIs: Custom solutions available

// Remember: Consistency matters more than amount!`,
//       followUp: ['Start investing', 'SIP benefits', 'Free consultation', 'Wealth management']
//     },

//     'retirement': {
//       answer: `Retirement Planning Services:

// 🎯 Our Approach:
// 1. Current corpus assessment
// 2. Inflation-adjusted goals
// 3. Tax-efficient vehicles
// 4. Withdrawal strategies
// 5. Healthcare planning

// 📊 Recommended Instruments:
// • NPS - Tax benefits under 80CCD
// • EPF - Guaranteed returns
// • PPF - Long-term safety
// • Mutual Funds - Growth potential

// 💰 Example: For ₹1L/month retirement income, you need approx ₹3Cr corpus at age 60.`,
//       followUp: ['NPS benefits', 'Investment options', 'Calculate retirement', 'Free consultation']
//     },

//     'mutual funds': {
//       answer: `Mutual Fund Advisory:

// 📈 Our Approach:
// • Goal-based fund selection
// • Risk-adjusted portfolios
// • Regular monitoring
// • Tax-efficient strategies

// 🎯 Fund Categories:
// • Equity Funds (Large, Mid, Small Cap)
// • Debt Funds (Liquid, Corporate Bond)
// • Hybrid Funds (Balanced, Arbitrage)
// • International Funds
// • Sectoral/Thematic Funds

// ⭐ ARN: 338534 (AMFI Registered)
// 📊 Review Frequency: Quarterly`,
//       followUp: ['SIP benefits', 'Tax saving funds', 'Start investing', 'Minimum amount']
//     },

//     'consultation': {
//       answer: `100% Free Consultation Includes:

// ✅ 30-minute session with our advisory team
// ✅ Financial situation analysis
// ✅ Goal discussion & gap identification
// ✅ Preliminary recommendations
// ✅ Service & fee explanation
// ✅ No obligations or hidden charges

// 📅 How to Schedule:
// 1. WhatsApp: https://wa.me/919820507696
// 2. Email ceo@mozno.in`,
//       followUp: ['Contact details', 'Our services', 'Fee structure', 'Book consultation']
//     },

//     'services': {
//       answer: `Mozno Wealth offers 6 integrated services:

// 📊 Wealth Management - Portfolio construction with mutual funds, PMS, AIFs, bonds

// 📈 Financial Planning - Retirement, goal-based investing, risk assessment

// 💰 Tax Planning - Direct & indirect tax optimization with compliance

// 🛡️ Insurance Management - Life, health, general insurance solutions

// 🏦 Borrowing Solutions - Strategic debt management & financing

// 📋 Succession Planning - Estate planning & wealth transfer strategies`,
//       followUp: ['Wealth management details', 'Tax planning services', 'Insurance options', 'Fee structure']
//     }
//   };

//   // Initial suggestions
//   const initialSuggestions = [
//     'What services do you offer?',
//     'Wealth management details',
//     'Tax planning services',
//     'What are your fees?',
//     'Contact information',
//     'Minimum investment?',
//     'Retirement planning',
//     'Free consultation'
//   ];

//   // Initialize chat
//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setIsTyping(true);
//       setTimeout(() => {
//         setIsTyping(false);
//         addMessage(
//           'bot',
//           `Hello! I'm the Mozno Wealth Assistant 🤖

// I can help you with:
// • Services & Solutions
// • Investment Guidance
// • Tax Planning
// • Insurance Options
// • Fee Structure
// • Appointments

// Tap a question below to get started!`
//         );
//         setSuggestedQuestions(initialSuggestions);
//       }, 800);
//     }
//   }, [isOpen]);

//   // Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isTyping]);

//   // Add message to chat
//   const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { 
//       sender, 
//       text, 
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//     }]);
//   };

//   // Handle question click
//   const handleQuestionClick = (question) => {
//     addMessage('user', question);
//     setIsTyping(true);
//     setSuggestedQuestions([]);

//     const userMessage = question.toLowerCase();
//     let response = null;
//     let followUp = [];

//     // Find matching response
//     for (const [key, data] of Object.entries(knowledgeBase)) {
//       if (userMessage.includes(key)) {
//         response = data.answer;
//         followUp = data.followUp || [];
//         break;
//       }
//     }

//     // Default response
//     if (!response) {
//       response = `I understand you're asking about "${question}". 

// I can help you with:
// • Our services
// • Investment options
// • Tax planning
// • Insurance solutions
// • Fees & charges
// • Contact information

// Please try one of the suggestions below!`;
//       followUp = initialSuggestions.slice(0, 4);
//     }

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', response);
//       setSuggestedQuestions(followUp.length > 0 ? followUp : initialSuggestions.slice(0, 4));
//     }, 1000 + Math.random() * 500);
//   };

//   // Quick action buttons
//   const quickActions = [
//     { icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Home', path: '/' },
//     { icon: <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Services', path: '/services' },
//     { icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Tools', path: '/tools' },
//     { icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Insurance', path: '/services/insurance-planning' },
//     { icon: <FileText className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Tax', path: '/services/tax-planning' },
//     { icon: <Phone className="w-3 h-3 sm:w-4 sm:h-4" />, label: 'Contact', path: '/contact' },
//   ];

//   return (
//     <>
//       {/* Chat Toggle Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         className={`
//           fixed z-50 flex items-center justify-center
//           right-3 xs:right-4 sm:right-6
//           bottom-3 xs:bottom-4 sm:bottom-6
//           w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16
//           rounded-full shadow-2xl
//           bg-gradient-to-br from-emerald-500 to-teal-500
//           text-white
//           transition-colors duration-300
//           hover:from-emerald-600 hover:to-teal-600
//         `}
//         aria-label="Chat with Mozno Assistant"
//       >
//         <AnimatePresence mode="wait">
//           {isOpen ? (
//             <motion.div
//               key="close"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <X className="w-5 h-5 xs:w-6 xs:h-6" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="open"
//               initial={{ rotate: 90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: -90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <Bot className="w-5 h-5 xs:w-6 xs:h-6" />
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="absolute -top-1 -right-1 w-2.5 h-2.5 xs:w-3 xs:h-3 bg-red-500 rounded-full border-2 border-white"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.button>

//       {/* Chat Widget */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className={`
//               fixed z-40
//               right-2 xs:right-3 sm:right-4 md:right-6
//               bottom-16 xs:bottom-20 sm:bottom-24
//               w-[calc(100vw-1rem)] xs:w-[calc(100vw-1.5rem)] sm:w-[380px] md:w-[420px]
//               max-w-[420px]
//               h-[70vh] xs:h-[72vh] sm:h-[75vh]
//               max-h-[600px]
//               flex flex-col
//               bg-white rounded-2xl sm:rounded-3xl shadow-2xl
//               border border-gray-200
//               overflow-hidden
//             `}
//           >
//             {/* Header */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-3 xs:p-4 sm:p-5"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 xs:gap-3">
//                   <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
//                     <Bot className="w-4 h-4 xs:w-5 xs:h-5" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-sm xs:text-base sm:text-lg">Mozno Assistant</h3>
//                     <div className="flex items-center gap-1.5">
//                       <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-400 rounded-full animate-pulse" />
//                       <p className="text-emerald-100 text-[10px] xs:text-xs">Online • We&apos;re here to help</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1.5 xs:p-2 hover:bg-white/20 rounded-full transition-colors"
//                   aria-label="Close chat"
//                 >
//                   <X className="w-4 h-4 xs:w-5 xs:h-5" />
//                 </button>
//               </div>
//             </motion.div>

//             {/* Quick Actions */}
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-gray-50 px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border-b"
//             >
//               <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
//                 <HelpCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-gray-400" />
//                 <span className="text-[10px] xs:text-xs font-medium text-gray-600">Quick Navigation</span>
//               </div>
//               <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
//                 {quickActions.map((action, index) => (
//                   <motion.div
//                     key={action.label}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.1 + index * 0.05 }}
//                   >
//                     <Link
//                       to={action.path}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white text-gray-700 text-[10px] xs:text-xs font-medium rounded-lg border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
//                     >
//                       {action.icon}
//                       <span className="hidden xs:inline">{action.label}</span>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-2 xs:p-3 sm:p-4 space-y-3 xs:space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
//               <AnimatePresence>
//                 {messages.map((msg, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`
//                         max-w-[90%] xs:max-w-[85%] sm:max-w-[80%]
//                         rounded-2xl
//                         p-3 xs:p-4
//                         ${msg.sender === 'user'
//                           ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-sm'
//                           : 'bg-white border border-gray-100 shadow-sm rounded-bl-sm text-gray-800'
//                         }
//                       `}
//                     >
//                       <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
//                         <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-white/20' : 'bg-emerald-100'}`}>
//                           {msg.sender === 'user' ? (
//                             <User className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
//                           ) : (
//                             <Bot className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-600" />
//                           )}
//                         </div>
//                         <span className={`text-[10px] xs:text-xs ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
//                           {msg.sender === 'user' ? 'You' : 'Mozno'} • {msg.timestamp}
//                         </span>
//                       </div>
//                       <div className="whitespace-pre-line text-xs xs:text-sm leading-relaxed">
//                         {msg.text}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Typing Indicator */}
//               <AnimatePresence>
//                 {isTyping && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex justify-start"
//                   >
//                     <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm p-3 xs:p-4">
//                       <div className="flex items-center gap-1.5 xs:gap-2">
//                         <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-emerald-100 flex items-center justify-center">
//                           <Bot className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-600" />
//                         </div>
//                         <div className="flex gap-1">
//                           <motion.span
//                             animate={{ opacity: [0.4, 1, 0.4] }}
//                             transition={{ duration: 1, repeat: Infinity, delay: 0 }}
//                             className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full"
//                           />
//                           <motion.span
//                             animate={{ opacity: [0.4, 1, 0.4] }}
//                             transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
//                             className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full"
//                           />
//                           <motion.span
//                             animate={{ opacity: [0.4, 1, 0.4] }}
//                             transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
//                             className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Suggested Questions */}
//             <AnimatePresence>
//               {suggestedQuestions.length > 0 && !isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="border-t bg-gradient-to-b from-white to-gray-50 px-2 xs:px-3 sm:px-4 py-3 xs:py-4"
//                 >
//                   <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
//                     <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-emerald-500" />
//                     <span className="text-[10px] xs:text-xs font-semibold text-gray-700">Tap a question to continue</span>
//                   </div>
//                   <div className="flex flex-wrap gap-1.5 xs:gap-2">
//                     {suggestedQuestions.map((question, index) => (
//                       <motion.button
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.08 }}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleQuestionClick(question)}
//                         className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-white text-emerald-700 text-[10px] xs:text-xs sm:text-sm font-medium rounded-full border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all shadow-sm"
//                       >
//                         {question}
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Footer */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="border-t bg-gray-50 px-2 xs:px-3 sm:px-4 py-2 xs:py-3"
//             >
//               <div className="flex items-center justify-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs text-gray-500">
//                 <MessageCircle className="w-3 h-3 xs:w-4 xs:h-4" />
//                 <span>Powered by Mozno Wealth</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Aibot;
