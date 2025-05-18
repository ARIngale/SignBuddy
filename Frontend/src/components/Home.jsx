
import { Link } from "react-router-dom"
import { ArrowRight, HandMetal, MessageSquare, Users, Star, ArrowUpRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const features = [
  {
    name: "Sign to Voice Translation",
    description: "Translate sign language gestures into text and voice in real-time with advanced AI recognition.",
    icon: HandMetal,
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    name: "Voice to Sign Translation",
    description: "Convert spoken words into sign language visuals instantly using our cutting-edge technology.",
    icon: MessageSquare,
    color: "bg-gradient-to-br from-pink-500 to-purple-600",
  },
  {
    name: "Comprehensive Dictionary",
    description: "Access our extensive library of signs with detailed explanations and usage examples.",
    icon: Users,
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
  },
]

const testimonials = [
  {
    content: "SignBuddy has transformed how I communicate with my hearing colleagues. It's intuitive and accurate!",
    author: "Alex Johnson",
    role: "Teacher",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content: "As a parent of a deaf child, this tool has been invaluable for our family communication.",
    author: "Maria Rodriguez",
    role: "Parent",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content: "The real-time translation has made my workplace much more inclusive and accessible.",
    author: "Sam Taylor",
    role: "Software Engineer",
    avatar: "/images/man.png",
    rating: 4,
  },
  {
    content: "I've tried many sign language apps, but SignBuddy is by far the most accurate and user-friendly.",
    author: "Jamie Lee",
    role: "Student",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "SignBuddy has opened up new opportunities for me in my professional life. I can now communicate effectively with all my clients.",
    author: "Taylor Morgan",
    role: "Consultant",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "The app's accuracy is impressive. It recognizes even subtle sign language movements with great precision.",
    author: "Jordan Smith",
    role: "ASL Instructor",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "SignBuddy has opened up new opportunities for me in my professional life. I can now communicate effectively with all my clients.",
    author: "Taylor Morgan",
    role: "Consultant",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "The app's accuracy is impressive. It recognizes even subtle sign language movements with great precision.",
    author: "Jordan Smith",
    role: "ASL Instructor",
    avatar:"/images/man.png",
    rating: 5,
  },
  {
    content:
      "SignBuddy has opened up new opportunities for me in my professional life. I can now communicate effectively with all my clients.",
    author: "Taylor Morgan",
    role: "Consultant",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "The app's accuracy is impressive. It recognizes even subtle sign language movements with great precision.",
    author: "Jordan Smith",
    role: "ASL Instructor",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "SignBuddy has opened up new opportunities for me in my professional life. I can now communicate effectively with all my clients.",
    author: "Taylor Morgan",
    role: "Consultant",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "The app's accuracy is impressive. It recognizes even subtle sign language movements with great precision.",
    author: "Jordan Smith",
    role: "ASL Instructor",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "SignBuddy has opened up new opportunities for me in my professional life. I can now communicate effectively with all my clients.",
    author: "Taylor Morgan",
    role: "Consultant",
    avatar: "/images/man.png",
    rating: 5,
  },
  {
    content:
      "The app's accuracy is impressive. It recognizes even subtle sign language movements with great precision.",
    author: "Jordan Smith",
    role: "ASL Instructor",
    avatar: "/images/man.png",
    rating: 5,
  },
]

const sponsors = [
  { name: "Microsoft", logo: "/images/logo.png", },
  { name: "Google", logo: "/images/logo.png", },
  { name: "Apple", logo:"/images/logo.png", },
  { name: "Amazon", logo: "/images/logo.png", },
  { name: "Meta", logo: "/images/logo.png",},
  { name: "IBM", logo: "/images/logo.png", },
]

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "150+", label: "Countries" },
  { value: "24/7", label: "Support" },
  { value: "98%", label: "Satisfaction" },
]

const PAGE_SIZE = 4;

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const testimonialRef = useRef(null)

  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(testimonials.length / PAGE_SIZE);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % maxPage);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + maxPage) % maxPage);
  };

  const startIndex = page * PAGE_SIZE;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + PAGE_SIZE);



  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div
            className={`mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-primary to-pink-600">
                Breaking barriers in communication
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                SignBuddy helps bridge the gap between hearing-impaired and non-hearing-impaired individuals by
                translating between sign language and voice in real-time.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/sign-to-voice"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10"
                >
                  Try Sign to Voice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/voice-to-sign"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring h-10"
                >
                  Try Voice to Sign
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 duration-300">
                <img
                  src="/images/sign-language.gif"
                  alt="Sign language demonstration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-medium">Real-time sign language translation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-transparent rounded-lg shadow-md border border-primary/10 transform transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Innovative */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Innovative Technology</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Breaking communication barriers with AI</p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our cutting-edge technology combines computer vision, machine learning, and linguistics to create a seamless
            translation experience between sign language and spoken language.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-5`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>

                  <div className="mt-4 flex items-center text-primary">
                    <Link
                      to={index === 0 ? "/sign-to-voice" : index === 1 ? "/voice-to-sign" : "/dictionary"}
                      className="inline-flex items-center text-sm font-medium hover:underline"
                    >
                      Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsors Section - Enhanced */}
      <div className="bg-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl">
              SignBuddy is backed by some of the world's most innovative companies committed to accessibility and
              inclusion.
            </p>
          </div>

          <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-7xl lg:grid-cols-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name || index}
                className="flex justify-center items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 dark:bg-white/10 dark:shadow-gray-800"
              >
                <img
                  className="h-20 w-20 object-contain grayscale hover:grayscale-0 transition duration-300"
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  width={80}
                  height={80}
                />
              </div>
            ))}
          </div>


          <div className="mt-16 flex justify-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-md border border-primary bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10"
            >
              View All Partners
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Horizontal Scrolling */}
      <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">What Users Say</h2>

        <div className="relative overflow-hidden">
          <div
            key={page}
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(0)` }}
          >
            {currentTestimonials.map((t, index) => (
           <div
           key={index}
           className="
             w-full sm:w-[300px]
             rounded-2xl p-6 
             bg-tranparent border border-gray-300
             shadow-lg transition-transform duration-300 hover:scale-105
             text-primary
           "
         >
           <p className="text-sm mb-4">"{t.content}"</p>
           <div className="flex items-center gap-3">
             <img
               src={t.avatar}
               alt={t.author}
               className="h-10 w-10 rounded-full border border-gray-300 dark:border-white/20"
             />
             <div className="text-left">
               <p className="text-sm font-semibold">{t.author}</p>
               <p className="text-xs text-gray-600 dark:text-white/70">{t.role}</p>
             </div>
           </div>
           <div className="mt-3 flex">
             {[...Array(t.rating)].map((_, i) => (
               <svg
                 key={i}
                 className="h-4 w-4 text-yellow-400"
                 fill="currentColor"
                 viewBox="0 0 20 20"
               >
                 <path d="M10 15l-5.878 3.09L5.954 12 1 7.91l6.062-.91L10 2l2.938 5 6.062.91L14.046 12l1.832 6.09z" />
               </svg>
             ))}
           </div>
         </div>
         
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>

      </div>
    </section>


      {/* CTA Section - Redesigned */}
      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-2xl bg-transparent shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                  Ready to break communication barriers?
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  Join over 10,000 users who are already using SignBuddy to communicate more effectively in schools,
                  workplaces, and everyday life.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/sign-to-voice"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 h-10"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 h-10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg  p-4 shadow-md">
                        <div className="text-sm font-medium text-gray-600 mb-1">For Education</div>
                        <div className="font-semibold text-gray-500">Special pricing for schools</div>
                      </div>
                      <div className="rounded-lg  p-4 shadow-md">
                        <div className="text-sm font-medium text-gray-600 mb-1">For Business</div>
                        <div className="font-semibold text-gray-500">Enterprise solutions</div>
                      </div>
                      <div className="rounded-lg p-4 shadow-md">
                        <div className="text-sm font-medium text-gray-600 mb-1">For Individuals</div>
                        <div className="font-semibold text-gray-500">Free personal accounts</div>
                      </div>
                      <div className="rounded-lg  p-4 shadow-md">
                        <div className="text-sm font-medium text-gray-600 mb-1">For Developers</div>
                        <div className="font-semibold text-gray-500">API access available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
