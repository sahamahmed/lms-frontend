import Footer from '@/components/Footer';
import Seperator from '@/components/Seperator';
import React from 'react'

const Page = () => {
    return (
        <>
            <div className="min-h-screen bg-inherit  text-slate-800 dark:text-slate-200 py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">About Our ELearning Platform</h1>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Platform Overview</h2>
                        <p className="text-lg">
                            This ELearning platform is designed to provide a comprehensive and secure learning environment,
                            offering both social-based and credentials-based login options. We prioritize user security with
                            OTP verification via email during registration. The platform features a dynamic layout that
                            adapts to user preferences, supporting both light and dark themes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
                        <p className="text-lg">
                            The Admin Dashboard is the control center for managing courses, users, and orders. Admins can view detailed analytics, manage site content, and update the layout of the site. The dashboard also includes real-time notifications powered by Socket.IO, ensuring that admins are always informed of important updates.
                        </p>
                        <div className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-lg p-4 mt-6">
                            <h3 className="text-xl font-bold">Admin Login Details</h3>
                            <p className="mt-2">
                                To access the Admin Dashboard, please use the following credentials:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                <li><strong>Email:</strong> admin@gmail.com</li>
                                <li><strong>Password:</strong> 12345678</li>
                            </ul>
                        </div>
                    </section>


                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">User Features</h2>
                        <p className="text-lg">
                            Users can explore detailed course content, purchase courses using secure Stripe payment
                            integration, and engage with the content by adding questions to videos and leaving reviews.
                            After placing an order, users gain full access to their purchased courses. Additionally, users
                            can update their profile information and enjoy a personalized experience based on their preferences.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
                        <p className="text-lg">
                            This platform is built using modern and robust technologies:
                        </p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                            <li>Backend: Node.js and TypeScript for scalable and maintainable code.</li>
                            <li>Database: MongoDB for flexible and efficient data storage.</li>
                            <li>Caching: Redis for fast data access and caching.</li>
                            <li>Authentication: NextAuth for seamless social sign-ins.</li>
                            <li>Payments: Stripe for secure and reliable payment processing.</li>
                            <li>Frontend: Next.js for a fast and dynamic user interface.</li>
                            <li>Data Fetching: RTK Query for efficient data fetching and caching.</li>
                            <li>State Management: Redux Toolkit for managing global state and user information.</li>
                        </ul>
                    </section>

                    <section className="text-center mt-10">
                        <p className="text-xl font-medium">
                            Thank you for visiting this platform. 
                        </p>
                    </section>
                </div>
            </div>
            <Seperator />
            <Footer />
        </>
    );
}

export default Page


  

