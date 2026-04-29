import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, HeartHandshake, TrendingUp, PieChart, DollarSign, Target, Home } from 'lucide-react'

const Tools = () => {
  const tools = [
    {
      icon: HeartHandshake,
      title: "Financial Health Check",
      description: "Assess your overall financial wellness and get personalized insights",
      link: "/tools/financial-health",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Risk Profiling",
      description: "Discover your investment risk tolerance with our comprehensive 30-question assessment",
      link: "/tools/risk-profile",
      color: "from-emerald-500 to-emerald-600"
    }
  ]

  const calculators = [
    {
      icon: PieChart,
      title: "SIP Calculator",
      description: "Calculate returns on your Systematic Investment Plan",
      link: "/calculators/sip",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calculator,
      title: "Step-Up SIP Calculator",
      description: "Plan step-up investments with increasing contributions",
      link: "/calculators/step-up-sip",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: DollarSign,
      title: "Lumpsum Calculator",
      description: "Calculate returns on one-time lumpsum investments",
      link: "/calculators/lumpsum",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Home,
      title: "EMI Calculator",
      description: "Calculate monthly EMI for loans and mortgages",
      link: "/calculators/emi",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Target,
      title: "Retirement Calculator",
      description: "Plan for a comfortable retirement with our calculator",
      link: "/calculators/retirement",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Goal Planning Calculator",
      description: "Calculate investments needed to achieve your financial goals",
      link: "/calculators/goal-planning",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Calculator,
      title: "SWP Calculator",
      description: "Systematic Withdrawal Plan calculator for retirement income",
      link: "/calculators/swp",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "STP Calculator",
      description: "Systematic Transfer Plan calculator for portfolio rebalancing",
      link: "/calculators/stp",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Calculator,
      title: "Delay Planning Calculator",
      description: "Understand the cost of delaying your investments",
      link: "/calculators/delay-planning",
      color: "from-rose-500 to-rose-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Financial Tools & Calculators
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Empower your financial decisions with our comprehensive suite of tools and calculators designed for Indian investors.
          </p>
        </div>

        {/* Main Tools Section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Assessment Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                to={tool.link}
                className="group"
              >
                <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} rounded-t-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculators Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Financial Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {calculators.map((calc) => (
              <Link
                key={calc.title}
                to={calc.link}
                className="group"
              >
                <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${calc.color} rounded-t-2xl`} />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <calc.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {calc.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {calc.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 p-8 sm:p-10 lg:p-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Need Personalized Guidance?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our financial advisors can help you interpret these results and create a personalized wealth strategy.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors duration-300"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Tools
