/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */

"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';


export default function Home() {


  return (
    <section >
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-screen px-4 space-y-8 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold sm:text-6xl"
          >
            Welcome to ChatVerse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg sm:text-xl"
          >
            Connect Anytime, Anywhere
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/getStarted">
              <button className="px-6 py-3 text-lg font-medium bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition">
                Get Started
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-12 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Features
          </motion.h2>
          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '💬', title: 'Instant Messaging', desc: 'Real-time text chats' },
              { icon: '📸', title: 'Media Sharing', desc: 'Send photos and videos' },
              { icon: '🔒', title: 'End-to-End Encryption', desc: 'Secure your conversations' },
              { icon: '👥', title: 'Group Chats', desc: 'Chat with multiple people' },
              { icon: '📞', title: 'Voice & Video Calls', desc: 'Stay connected' },
              { icon: '🌓', title: 'Dark Mode', desc: 'Switch themes seamlessly' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-12 bg-gray-100 dark:bg-gray-800">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'John Doe', feedback: 'The best chat app ever!' },
              { name: 'Jane Smith', feedback: 'Fast and secure messaging!' },
              { name: 'Samuel Green', feedback: 'I love the group chat feature!' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white dark:bg-gray-700 shadow rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <p className="italic">{testimonial.feedback}</p>
                <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-6 text-center bg-gray-800 text-white">
          <p>&copy; {new Date().getFullYear()} ChatVerse. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}
