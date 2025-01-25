import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, DollarSign, Brain, Target } from 'lucide-react';
import axios from 'axios';

function App() {
  const bookCovers = [
    "https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/physocologyofmoney.jpg",
    "https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/richdad.jpg",
    "https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/thinkandgrowrich.jpg",
    "https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/intelligentinvestor.jpg"
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    monthlySalary: '',
    monthlyExpenses: '',
    currentSavings: '',
    investedAmount: '',
    riskTolerance: 'medium'
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const payload = {
      "name": formData.name,
      "user_email": formData.email,
      "age": formData.age,
      "monthly_income": formData.monthlySalary,
      "monthly_fixed_expenses": formData.monthlyExpenses,
      "current_savings": formData.currentSavings,
      "invested_amount": formData.investedAmount,
      "risk_tolerance": formData.riskTolerance
    };

    // Make the backend call without awaiting the response
    axios.post('https://api-lr.agent.ai/v1/agent/liox4t09tgqnmks5/webhook/bb953aff', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).catch(err => {
      console.error('Submission error:', err);
    });

    // Immediately show submission state and reset form
    setTimeout(() => { }, 3000);

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        age: '',
        email: '',
        monthlySalary: '',
        monthlyExpenses: '',
        currentSavings: '',
        investedAmount: '',
        riskTolerance: 'medium'
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 animate-fade-in">
              <Brain className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-semibold text-blue-600">freedomFund</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight animate-fade-in">
              <span className="text-gray-900">Your Personalized</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                AI Financial Advisor
              </span>
              <br />
              <span className="text-gray-900">for Smarter Money</span>
              <br />
              <span className="text-gray-900">Management</span>
            </h1>

            <p className="text-lg font-light text-gray-500 max-w-2xl animate-fade-in-delay">
              Our platform provides clear insights into your finances and a personalized plan to achieve financial freedom. Learn smart money management, master growth strategies, and unlock the power of financial literacy. Start building wealth today—because managing your money wisely is the key to lasting success.
            </p>

            <button className="group inline-flex items-center mt-2 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-md font-semibold transition-all hover:from-blue-700 hover:to-purple-700 animate-fade-in-delay-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col items-start  animate-fade-in-delay-3">

              <div className="flex items-center gap-10">
                <img
                  src="https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/agentai.png"
                  alt="Brand 1 Logo"
                  className="h-12 object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/Ritesh2351235/freedomFund/main/src/logos/dev.png"
                  alt="Brand 2 Logo"
                  className="h-12 object-contain"
                />
              </div>
            </div>
          </div>


          {/* Right column - AI Financial Dashboard mockup */}
          <div className="relative animate-float">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
              {/* Dashboard content remains the same */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="bg-gray-100 rounded-full px-4 py-1 text-sm">AI Analysis</div>
                </div>

                {/* Financial Goals */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">Savings Goal</span>
                      <Target className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">$50,000</div>
                    <div className="text-sm text-purple-500">78% completed</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">Monthly Savings</span>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">$2,845</div>
                    <div className="text-sm text-green-500">+15.3% vs target</div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-700">AI Recommendations</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <p className="text-sm text-gray-600">Opportunity to reduce monthly expenses by $320 through subscription optimization</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <p className="text-sm text-gray-600">Consider increasing emergency fund by $5,000 based on spending patterns</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                      <p className="text-sm text-gray-600">Investment portfolio diversification recommended for better risk management</p>
                    </div>
                  </div>
                </div>

                {/* Financial Health Score */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">Financial Health</span>
                      <div className="text-lg font-bold text-blue-500">82/100</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">Next Review</span>
                      <DollarSign className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-sm text-gray-700">Scheduled in 2 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column - Text content */}
            <div className="space-y-5">
              <div className='flex text-3xl font-bold '>
                Proven Financial Strategies Inspired by Bestselling Books
              </div>
              <div className="text-gray-500 text-md italic">
                "We’ve distilled the most effective financial principles from world-renowned books to bring you strategies that truly work. Whether it’s budgeting, investing, or wealth-building, these timeless insights form the foundation of our platform to guide you toward financial success."
              </div>
              <div
                className="relative w-full h-[400px] flex items-center justify-center ml-40"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {bookCovers.map((cover, index) => (
                  <motion.img
                    key={index}
                    src={cover}
                    alt={`Book cover ${index + 1}`}
                    className="absolute w-48 h-72 object-cover rounded-lg shadow-lg"
                    initial={{
                      left: isHovered ? `${(index - 1.5) * 150}px` : 0,
                      scale: 1,
                      zIndex: bookCovers.length - index
                    }}
                    animate={{
                      left: isHovered ? `${(index - 1.5) * 150}px` : 0,
                      scale: isHovered ? 1.1 : 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right column - Form */}
            <div className='space-y-5'>
              <div className='flex text-lg font-semibold '>
                Get your personalized finance article delivered to your inbox!
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-500 mt-32">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Salary ($)
                      </label>
                      <input
                        type="number"
                        name="monthlySalary"
                        id="monthlySalary"
                        value={formData.monthlySalary}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700 mb-2">
                        Fixed Monthly Expenses ($)
                      </label>
                      <input
                        type="number"
                        name="monthlyExpenses"
                        id="monthlyExpenses"
                        value={formData.monthlyExpenses}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Savings ($)
                      </label>
                      <input
                        type="number"
                        name="currentSavings"
                        id="currentSavings"
                        value={formData.currentSavings}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="investedAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Invested Amount ($)
                      </label>
                      <input
                        type="number"
                        name="investedAmount"
                        id="investedAmount"
                        value={formData.investedAmount}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Tolerance
                    </label>
                    <select
                      name="riskTolerance"
                      id="riskTolerance"
                      value={formData.riskTolerance}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isSubmitted}
                    className={`w-1/2 mx-auto flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                      ${isLoading ? 'bg-gray-400' :
                        isSubmitted ? 'bg-green-500' :
                          'bg-black hover:bg-gray-800'}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : isSubmitted ? (
                      'Report Emailed!'
                    ) : (
                      'Get Your Financial Plan'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;