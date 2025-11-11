import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaStar, FaCrown, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Homepagepricing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "/month",
      icon: FaRocket,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "100 credits / month",
        "Basic data sources",
        "Limited search results"
      ],
      popular: false
    },
    {
      name: "Standard",
      price: "$99",
      period: "/month",
      icon: FaStar,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "500 credits / month",
        "Advanced data sources",
        "Unlimited search results"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "$299",
      period: "/month",
      icon: FaCrown,
      gradient: "from-pink-500 to-rose-500",
      features: [
        "2000 credits / month",
        "All data sources",
        "All features",
        "Unlimited search results"
      ],
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <HiSparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Ready to
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              get started?
            </span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`relative modern-card ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                      POPULAR
                    </div>
                  </div>
                )}

                <div className={`glass-card rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular ? 'border-2 border-purple-500/50' : ''
                }`}>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-400 font-semibold">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`mt-1 p-1 rounded-full bg-gradient-to-br ${plan.gradient}`}>
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn-modern w-full py-4 rounded-xl font-bold text-base shadow-lg ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white`
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {plan.price === "Free" ? "Sign up for free" : "Get Started"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Homepagepricing;
