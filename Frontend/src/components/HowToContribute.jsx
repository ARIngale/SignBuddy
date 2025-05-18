
import { Link } from "react-router-dom"
import { useState } from "react"
import {
  CheckCircle,
  Gift,
  HandMetal,
  Upload,
  Users,
  Code,
  BookOpen,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Play,
  Globe,
} from "lucide-react"

const contributionWays = [
  {
    title: "Submit New Signs",
    description: "Record and submit new sign language gestures to expand our dictionary.",
    icon: HandMetal,
    cta: "Submit Signs",
    href: "/login",
    color: "bg-gradient-to-br from-blue-500 to-teal-500",
  },
  {
    title: "Become a Sponsor",
    description: "Support our mission financially and help us reach more people in need.",
    icon: Gift,
    cta: "Sponsor Us",
    href: "/contact",
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    title: "Join Our Team",
    description: "Volunteer your skills to help develop and improve SignBuddy.",
    icon: Users,
    cta: "Join Team",
    href: "/contact",
    color: "bg-gradient-to-br from-emerald-500 to-orange-600",
  },
]

const additionalWays = [
  {
    title: "Contribute Code",
    description: "Help improve our platform by contributing to our open-source codebase.",
    icon: Code,
    color: "bg-gradient-to-br from-blue-500 to-sky-600",
  },
  {
    title: "Translate Content",
    description: "Help make SignBuddy accessible in more languages around the world.",
    icon: Globe,
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    title: "Spread Awareness",
    description: "Share SignBuddy with your network to help more people discover our platform.",
    icon: Heart,
    color: "bg-gradient-to-br from-rose-500 to-pink-600",
  },
]

const sponsorshipTiers = [
  {
    name: "Community",
    price: "$100/month",
    features: ["Logo on website", "Monthly newsletter mention", "Social media shoutout"],
    color: "border-blue-200 hover:border-blue-300",
    recommended: false,
  },
  {
    name: "Partner",
    price: "$500/month",
    features: [
      "Logo on website",
      "Monthly newsletter mention",
      "Social media shoutout",
      "Quarterly impact report",
      "Early access to new features",
    ],
    color: "border-teal-400 hover:border-teal-500",
    recommended: true,
    buttonColor: "bg-teal-600 hover:bg-teal-700 text-white",
  },
  {
    name: "Champion",
    price: "$1,000/month",
    features: [
      "Logo on website",
      "Monthly newsletter mention",
      "Social media shoutout",
      "Quarterly impact report",
      "Early access to new features",
      "Co-branded content",
      "Advisory board seat",
    ],
    color: "border-amber-200 hover:border-amber-300",
    recommended: false,
  },
]

const faqs = [
  {
    question: "How can I submit a new sign?",
    answer:
      "You can submit new signs by creating an account, navigating to the 'Submit Sign' section in your dashboard, and following the guided process to record or upload your sign video along with relevant details.",
  },
  {
    question: "What skills are needed to volunteer?",
    answer:
      "We welcome volunteers with various skills including development (frontend, backend, ML), design, sign language expertise, content creation, community management, and more. Whatever your skills, we likely have a way for you to contribute!",
  },
  {
    question: "How are sponsorship funds used?",
    answer:
      "Sponsorship funds directly support our mission by helping us maintain and improve the platform, expand our sign language database, develop new features, and make SignBuddy accessible to more people around the world.",
  },
  {
    question: "Can I contribute if I don't know sign language?",
    answer:
      "While sign language knowledge is valuable for certain contributions, we need help with development, design, marketing, community building, and many other areas that don't require sign language expertise.",
  },
  {
    question: "Is my contribution tax-deductible?",
    answer:
      "SignBuddy is a registered non-profit organization, so financial contributions may be tax-deductible depending on your location. We provide all necessary documentation for tax purposes.",
  },
]

export default function HowToContribute() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeTab, setActiveTab] = useState("individual")

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null)
    } else {
      setExpandedFaq(index)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600"></div>
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Mission</h1>
              <p className="text-xl text-white/90 mb-8">
                SignBuddy is a community-driven project that relies on contributions from people like you. Together, we
                can make communication accessible for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="#ways-to-contribute"
                  className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20">
            <HandMetal className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Ways to Contribute Section */}
        <div id="ways-to-contribute" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Ways to Contribute</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              There are many ways to get involved and help us make communication more accessible for everyone. Choose
              the option that best matches your interests and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contributionWays.map((way) => (
            <div
              key={way.title}
              className="rounded-lg border bg-transparent text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
            >
              <div className="p-6 flex-1">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${way.color} mb-4`}>
                  <way.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{way.title}</h3>
                <p className="text-muted-foreground mb-4">{way.description}</p>
              </div>
              <div className="p-6 pt-0 bg-muted/30 border-t">
                <Link
                  to={way.href}
                  className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 h-10 w-full"
                >
                  {way.cta}
                </Link>
              </div>
            </div>
          ))}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalWays.map((way) => (
              <div
                key={way.title}
                className="rounded-lg border bg-card text-card-foreground p-6 shadow hover:shadow-md transition-all duration-300"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${way.color} mb-4`}>
                  <way.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{way.title}</h3>
                <p className="text-muted-foreground text-sm">{way.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit New Signs Section */}
        <div className="mb-16">
          <div className="bg-transparent rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <HandMetal className="h-6 w-6 text-teal-600 mr-2" />
                  Submit New Signs
                </h2>
                <p className="mb-6">
                  Our dictionary is constantly growing, and we need your help to make it more comprehensive. If you know
                  sign language and want to contribute, you can submit new signs to our database.
                </p>

                <div className="relative">
                  <div className="absolute left-4 inset-y-0 w-0.5 bg-teal-200"></div>
                  <div className="space-y-6 ml-4 pl-6">
                    <div>
                      <div className="flex items-center">
                        <div className="absolute -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                          <span className="text-xs">1</span>
                        </div>
                        <h3 className="font-semibold">Create an account</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sign up or log in to your existing account to get started.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="absolute -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                          <span className="text-xs">2</span>
                        </div>
                        <h3 className="font-semibold">Navigate to "Submit Sign"</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Find the submission form in your dashboard.</p>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="absolute -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                          <span className="text-xs">3</span>
                        </div>
                        <h3 className="font-semibold">Record or upload your sign</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use your webcam to record the sign or upload a pre-recorded video.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="absolute -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                          <span className="text-xs">4</span>
                        </div>
                        <h3 className="font-semibold">Add details</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Include the word, meaning, usage examples, and any regional variations.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="absolute -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                          <span className="text-xs">5</span>
                        </div>
                        <h3 className="font-semibold">Submit for review</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our team of sign language experts will review and approve your submission.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 h-10"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Submit a Sign
                  </Link>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-video relative">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Sign submission process"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="rounded-full bg-teal-600/90 p-4 text-white hover:bg-teal-600 transition-colors">
                      <Play className="h-8 w-8" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <p className="font-medium">Watch how to submit a sign</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsorship Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Sponsorship Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              By becoming a sponsor, you help us maintain and improve SignBuddy, making it accessible to more people who
              need it. Choose the sponsorship tier that works best for you or your organization.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md p-1 bg-muted">
              <button
                onClick={() => setActiveTab("individual")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "individual" ? "bg-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setActiveTab("business")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "business" ? "bg-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setActiveTab("nonprofit")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "nonprofit" ? "bg-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Non-Profit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-lg border-2 ${tier.color} bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative ${
                  tier.recommended ? "transform -translate-y-2" : ""
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-2xl font-bold mt-2 mb-4">{tier.price}</p>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 h-10 w-full ${
                      tier.buttonColor ||
                      (tier.recommended
                        ? "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-600"
                        : "bg-teal-50 text-teal-600 hover:bg-teal-100 focus:ring-teal-600")
                    }`}
                  >
                    Become a {tier.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom sponsorship package? We can create a tailored solution for your organization.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring h-10"
            >
              Contact Us for Custom Options
            </Link>
          </div>
        </div>
        <div className="mb-16">
          <div className="bg-transparent text-primary rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're always looking for passionate individuals to join our team. Whether you're a developer, designer,
                sign language expert, or just someone who wants to help, we'd love to have you on board.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg border bg-transparent text-primary p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 mr-4">
                    <Code className="h-5 w-5 " />
                  </div>
                  <h3 className="text-lg font-semibold">Technical Roles</h3>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Frontend Developers</span>
                      <p className="text-sm text-muted-foreground">React, Next.js, Tailwind CSS</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Backend Developers</span>
                      <p className="text-sm text-muted-foreground">Node.js, Python, Database management</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Machine Learning Engineers</span>
                      <p className="text-sm text-muted-foreground">Computer vision, NLP, TensorFlow</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">UX/UI Designers</span>
                      <p className="text-sm text-muted-foreground">Figma, accessibility design</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">QA Testers</span>
                      <p className="text-sm text-muted-foreground">Manual and automated testing</p>
                    </div>
                  </li>
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 h-10 w-full"
                >
                  Apply for Technical Role
                </Link>
              </div>

              <div className="rounded-lg border bg-transparent text-primary p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 mr-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Non-Technical Roles</h3>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Sign Language Experts</span>
                      <p className="text-sm text-muted-foreground">ASL, BSL, and other sign languages</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Content Writers</span>
                      <p className="text-sm text-muted-foreground">Blog posts, documentation, tutorials</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Community Managers</span>
                      <p className="text-sm text-muted-foreground">Social media, forums, user engagement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Outreach Coordinators</span>
                      <p className="text-sm text-muted-foreground">Schools, organizations, partnerships</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Translators</span>
                      <p className="text-sm text-muted-foreground">Multiple languages for global accessibility</p>
                    </div>
                  </li>
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 h-10 w-full"
                >
                  Apply for Non-Technical Role
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about contributing to SignBuddy? Find answers to common questions below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-lg border bg-card text-card-foreground shadow-md overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of contributors and help us break down communication barriers for people around the
            world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 h-10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
