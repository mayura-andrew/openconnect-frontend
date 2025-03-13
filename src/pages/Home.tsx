import React from 'react'
import { Button } from '@/components/ui/button'
import {
    ChevronRight,
    Users,
    Globe,
    Lightbulb,
    Calendar,
    ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ForHomeImage from '@/assets/images/auth/ForHome.svg'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    }

    return (
        <>
            <div className="flex flex-col min-h-screen overflow-hidden">
                {/* Hero Section */}
                <section
                    id="hero-section"
                    className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-slate-100"
                >
                    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
                            <motion.div
                                className="max-w-2xl space-y-7"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-4 animate-pulse">
                                    {/* <Globe className="mr-2 h-3 w-3 text-green-600" />{' '} */}
                                    <span className="text-xs font-medium">
                                        ✨ Connecting university students with
                                        like-minded peers
                                    </span>
                                </div>
                                <h1 className="text-blue-600 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    {isAuthenticated
                                        ? `Welcome back${user?.firstname ? ', ' + user.firstname : ''}!`
                                        : 'Connect, Collaborate, Learn Together'}
                                </h1>
                                <p className="text-lg md:text-lg text-blue-900">
                                    {isAuthenticated
                                        ? 'Continue exploring ideas and connecting with students and faculty across campus.'
                                        : 'Join the OpenConnect campus community and discover meaningful connections with students, professors, and mentors in your field of study.'}
                                </p>

                                {isAuthenticated ? (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            className="text-base py-6 px-8 transition-all duration-300"
                                            onClick={() =>
                                                navigate('/community')
                                            }
                                        >
                                            Explore Community{' '}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-base py-6 px-8 hover:bg-blue-50 transition-all duration-300"
                                            onClick={() =>
                                                navigate('/myprofile')
                                            }
                                        >
                                            View Your Profile
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            className="text-base py-6 px-8 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            onClick={() =>
                                                navigate('/auth/signup')
                                            }
                                        >
                                            Let's Start{' '}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-base py-6 px-8 hover:bg-blue-50 transition-all duration-300"
                                            onClick={() =>
                                                navigate('/auth/login')
                                            }
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                className="relative flex items-center justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative hidden md:flex items-center justify-center max-w-lg">
                                    <div className="absolute -z-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
                                    <div className="w-5/6 h-5/6 flex items-center justify-center">
                                        <img
                                            src={ForHomeImage}
                                            alt="OpenConnect"
                                            className="max-w-full h-auto relative z-10 drop-shadow-2xl"
                                        />
                                    </div>
                                    <div className="absolute top-1/4 -left-5 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-float"></div>
                                    <div className="absolute bottom-1/3 -right-3 w-8 h-8 bg-purple-400 rounded-full opacity-30 animate-float animation-delay-2000"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Why Choose OpenConnect?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                We're building the network that helps students
                                and faculty connect, learn, and achieve more
                                together.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    icon: Users,
                                    title: 'Meaningful Connections',
                                    description:
                                        'Connect with like-minded professionals.',
                                    bgColor:
                                        'bg-gradient-to-br from-blue-100 to-blue-50',
                                    textColor: 'text-blue-600',
                                },
                                {
                                    icon: Globe,
                                    title: 'Global Community',
                                    description:
                                        'Join a campus-wide network spanning all disciplines',
                                    bgColor:
                                        'bg-gradient-to-br from-cyan-100 to-cyan-50',
                                    textColor: 'text-cyan-600',
                                },
                                {
                                    icon: Lightbulb,
                                    title: 'Share Ideas',
                                    description:
                                        'Exchange research ideas and get feedback from experts',
                                    bgColor:
                                        'bg-gradient-to-br from-purple-100 to-purple-50',
                                    textColor: 'text-purple-600',
                                },
                                {
                                    icon: Calendar,
                                    title: 'Events & Meetups',
                                    description:
                                        'Participate in campus events and academic meet-ups',
                                    bgColor:
                                        'bg-gradient-to-br from-teal-100 to-teal-50',
                                    textColor: 'text-teal-600',
                                },
                            ].map((feature, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Card className="relative overflow-hidden border-0 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                        <div className="p-6 flex flex-col items-center text-center space-y-4">
                                            <div
                                                className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto transform transition-transform duration-500 group-hover:scale-110 relative`}
                                            >
                                                <feature.icon
                                                    className={`w-8 h-8 ${feature.textColor} group-hover:scale-125 transition-transform duration-500`}
                                                />
                                                <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-200 group-hover:scale-110 transition-all duration-500"></span>
                                            </div>
                                            <h3 className="text-xl font-semibold">
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-b from-blue-50 to-white py-16 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-100 opacity-40 blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 text-center py-10 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Ready to grow your academic network?
                                    </h2>
                                    <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
                                        Join students and faculty who are
                                        already connecting, collaborating, and
                                        learning together.
                                    </p>
                                    <Button
                                        className="text-base py-6 px-10 shadow-lg hover:shadow-xl transition-all duration-300"
                                        onClick={() => navigate('/submit-idea')}
                                    >
                                        <span className="flex items-center">
                                            Submit an Idea{' '}
                                            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-horizontal" />
                                        </span>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Ready to grow your professional network?
                                    </h2>
                                    <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
                                        Join thousands of professionals who are
                                        already connecting, collaborating, and
                                        growing together.
                                    </p>
                                    <Button
                                        className="text-base py-6 px-10 shadow-lg hover:shadow-xl transition-all duration-300"
                                        onClick={() => navigate('/community')}
                                    >
                                        <span className="flex items-center">
                                            Explore Community{' '}
                                            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-horizontal" />
                                        </span>
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
