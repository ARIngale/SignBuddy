
import { useState, useEffect } from "react"
import { Award, Heart, Lightbulb, Users, ArrowRight, Globe, Sparkles, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex has been working in accessibility technology for over 10 years and founded SignBuddy to bridge communication gaps.",
    image: "/images/man.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Maria Rodriguez",
    role: "CTO",
    bio: "Maria leads our technical team and has extensive experience in machine learning and computer vision.",
    image: "/images/man.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    bio: "David oversees the development of SignBuddy's core features and ensures a seamless user experience.",
    image: "/images/man.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Kim",
    role: "Sign Language Expert",
    bio: "Sarah is a certified sign language interpreter who ensures the accuracy of our sign language database.",
    image: "/images/man.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

const values = [
  {
    name: "Accessibility",
    description: "We believe communication should be accessible to everyone, regardless of ability.",
    icon: Users,
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    name: "Innovation",
    description: "We continuously push the boundaries of technology to create better solutions.",
    icon: Lightbulb,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    name: "Inclusivity",
    description: "We design our products with all users in mind, ensuring no one is left behind.",
    icon: Heart,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    name: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to user experience.",
    icon: Award,
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
  },
]

const milestones = [
  {
    year: 2023,
    quarter: "Q1",
    title: "Founding",
    description: "SignBuddy was founded with the mission to make communication accessible to everyone.",
    icon: Sparkles,
  },
  {
    year: 2023,
    quarter: "Q3",
    title: "Beta Launch",
    description: "The first beta version of SignBuddy was released to a select group of users for testing.",
    icon: BookOpen,
  },
  {
    year: 2024,
    quarter: "Q1",
    title: "Public Launch",
    description: "SignBuddy was officially launched to the public, making it available to everyone.",
    icon: Globe,
  },
  {
    year: 2024,
    quarter: "Q2",
    title: "School Partnerships",
    description: "SignBuddy partnered with schools to bring the platform to educational institutions.",
    icon: Users,
  },
  {
    year: 2025,
    quarter: "Q1",
    title: "Looking Forward",
    description: "We continue to improve and expand SignBuddy, with exciting new features on the horizon.",
    icon: Lightbulb,
  },
]

export default function About() {
  const [activeTeamMember, setActiveTeamMember] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate team members
    const interval = setInterval(() => {
      setActiveTeamMember((prev) => (prev + 1) % teamMembers.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className={`mb-16 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600">
              About SignBuddy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about our mission, our team, and the values that drive us to create an inclusive communication
              platform.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-blue-600/90"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 text-white">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-4">
                  At SignBuddy, our mission is to break down communication barriers between hearing-impaired and
                  non-hearing-impaired individuals through innovative technology.
                </p>
                <p className="mb-4">
                  We believe that everyone deserves to be heard and understood, regardless of their ability to hear or
                  speak. Our platform leverages cutting-edge machine learning and computer vision to translate between
                  sign language and voice in real-time, making communication seamless and accessible.
                </p>
                <p>
                  Founded in 2023, SignBuddy has already helped thousands of people communicate more effectively in
                  schools, workplaces, and everyday life. We're committed to continuous improvement and expansion of our
                  services to reach more people in need.
                </p>

                <div className="mt-6">
                  <Link
                    to="/sign-to-voice"
                    className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
                  >
                    Try SignBuddy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/images/image.png"
                  alt="SignBuddy mission"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at SignBuddy, from product development to community
              engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.name}
                className="rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${value.color} mb-4`}>
                  <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.name}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind SignBuddy who are dedicated to making communication accessible for
              everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-square">
              <img
                src={teamMembers[activeTeamMember].image || "/placeholder.svg"}
                alt={teamMembers[activeTeamMember].name}
                className="object-cover w-full h-full transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{teamMembers[activeTeamMember].name}</h3>
                <p className="text-teal-300 font-medium">{teamMembers[activeTeamMember].role}</p>
                <p className="mt-2 text-white/80">{teamMembers[activeTeamMember].bio}</p>

                <div className="flex space-x-4 mt-4">
                  <a href={teamMembers[activeTeamMember].social.twitter} className="text-white/80 hover:text-white">
                    Twitter
                  </a>
                  <a href={teamMembers[activeTeamMember].social.linkedin} className="text-white/80 hover:text-white">
                    LinkedIn
                  </a>
                  <a href={teamMembers[activeTeamMember].social.github} className="text-white/80 hover:text-white">
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className={`rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      activeTeamMember === index ? "bg-teal-600 text-white shadow-lg" : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => setActiveTeamMember(index)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p
                          className={`text-xs ${activeTeamMember === index ? "text-white/80" : "text-muted-foreground"}`}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm line-clamp-2 ${activeTeamMember === index ? "text-white/80" : "text-muted-foreground"}`}
                    >
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Join Our Team</h3>
                <p className="text-muted-foreground mb-4">
                  We're always looking for passionate individuals to join our mission. Check out our open positions and
                  see how you can contribute.
                </p>
                <Link
                  to="/how-to-contribute"
                  className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 h-10"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SignBuddy is making a real difference in people's lives around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg bg-teal-600 text-white p-6 shadow-lg transform transition-all hover:scale-105 duration-300">
              <h3 className="text-4xl font-bold">10,000+</h3>
              <p className="text-teal-100 font-medium">Active Users</p>
              <p className="mt-2">People using SignBuddy to communicate effectively every day</p>
            </div>

            <div className="rounded-lg bg-blue-600 text-white p-6 shadow-lg transform transition-all hover:scale-105 duration-300">
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-blue-100 font-medium">Schools & Organizations</p>
              <p className="mt-2">Educational institutions and organizations implementing SignBuddy</p>
            </div>

            <div className="rounded-lg bg-cyan-600 text-white p-6 shadow-lg transform transition-all hover:scale-105 duration-300">
              <h3 className="text-4xl font-bold">2,000+</h3>
              <p className="text-cyan-100 font-medium">Signs in Dictionary</p>
              <p className="mt-2">Comprehensive sign language dictionary and growing every day</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">Success Stories</h3>

              <div className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <p className="italic mb-4">
                    "SignBuddy has completely transformed how I communicate with my deaf cousin. We used to rely on
                    basic gestures and writing things down, but now we can have real conversations. It's brought us so
                    much closer."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="font-medium text-teal-600">JM</span>
                    </div>
                    <div>
                      <p className="font-medium">Jamie Miller</p>
                      <p className="text-sm text-muted-foreground">Chicago, IL</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <p className="italic mb-4">
                    "As a teacher with two deaf students in my class, SignBuddy has been invaluable. It helps me ensure
                    they're fully included in all class activities and discussions. The other students have even started
                    learning sign language too!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="font-medium text-teal-600">RP</span>
                    </div>
                    <div>
                      <p className="font-medium">Rachel Peterson</p>
                      <p className="text-sm text-muted-foreground">Elementary School Teacher</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in SignBuddy's development from concept to reality.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center z-10">
                    <milestone.icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`text-sm font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-600 ${index % 2 === 0 ? "ml-auto" : ""}`}
                        >
                          {milestone.year} {milestone.quarter}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a user, contributor, or supporter, there are many ways to be part of the SignBuddy community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sign-to-voice"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
            >
              Try SignBuddy
            </Link>
            <Link
              to="/how-to-contribute"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
            >
              How to Contribute
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
