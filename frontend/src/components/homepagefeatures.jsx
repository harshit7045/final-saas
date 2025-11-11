import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaInstagram, FaImage } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Homepagefeatures() {
  const features = [
    {
      icon: FaEnvelope,
      title: "Email OSINT",
      description: "Validate email addresses and check if they are disposable, deliverable, or webmail",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://cdn.usegalileo.ai/sdxl10/49a3b53d-38f4-413d-a5ad-eccf54453ffa.png"
    },
    {
      icon: FaPhone,
      title: "Phone Number OSINT",
      description: "Validate phone numbers and get location, carrier, and line type information",
      gradient: "from-purple-500 to-pink-500",
      image: "https://cdn.usegalileo.ai/stability/3e566205-d1a1-44cc-b1d0-bba1816913bd.png"
    },
    {
      icon: FaInstagram,
      title: "Social Media OSINT",
      description: "Look up Instagram and Twitter profiles by username to get detailed profile information",
      gradient: "from-pink-500 to-rose-500",
      image: "https://cdn.usegalileo.ai/sdxl10/bfa16242-8d5f-4d32-a9e0-18f1b69ae706.png"
    },
    {
      icon: FaImage,
      title: "Reverse Image Search",
      description: "Upload an image to find similar images and discover where it appears online",
      gradient: "from-indigo-500 to-purple-500",
      image: "https://cdn.usegalileo.ai/stability/bd6e430c-affd-4a78-b3c3-4493fb53bf54.png"
    },
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

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
            <span className="text-sm font-semibold text-white">Our Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Powerful tools for
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              every use case
            </span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative modern-card"
              >
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative mb-6 rounded-xl overflow-hidden aspect-video">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url("${feature.image}")`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Homepagefeatures;
