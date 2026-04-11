import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchEvents, setSelectedEvent } from '../store/slices/EventSlice.js'
import EventCard from '../components/ui/EventCard.jsx'
import { useEffect } from 'react'
import { fetchCategories } from '../store/slices/CategorySlice.js'
import { fetchEvents } from '../store/slices/EventSlice.js'

const categories = [
  { name: 'Music', icon: '🎵', count: 24 },
  { name: 'Tech', icon: '💻', count: 18 },
  { name: 'Art', icon: '🎨', count: 12 },
  { name: 'Comedy', icon: '😂', count: 9 },
  { name: 'Sports', icon: '⚡', count: 21 },
  { name: 'Food', icon: '🍽️', count: 15 },
]

const stats = [
  { value: '50K+', label: 'Happy Attendees' },
  { value: '1.2K', label: 'Events Hosted' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '200+', label: 'Cities Covered' },
]

export default function HomePage() {
   const { featuredEvents } = useSelector(s => s.events)
  const { eventList, loading: eventsLoading, error: eventsError } = useSelector((state) => state?.event)
  const { categoryList, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state?.category)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchEvents())
  }, [dispatch])

  // Skeleton Components
  const CategorySkeleton = () => (
    <div className="glass-card rounded-2xl p-5 flex flex-col items-center gap-2 text-center animate-pulse">
      <div className="w-16 h-4 bg-white/10 rounded-full mb-1" />
      <div className="w-24 h-3 bg-white/5 rounded-full" />
    </div>
  )

  const EventSkeleton = () => (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      <div className="aspect-[16/10] bg-white/10" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-16 h-4 bg-white/10 rounded-full" />
          <div className="w-8 h-4 bg-white/10 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="w-full h-5 bg-white/10 rounded-lg" />
          <div className="w-2/3 h-5 bg-white/10 rounded-lg" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="w-4 h-4 bg-white/10 rounded-full" />
          <div className="w-24 h-4 bg-white/5 rounded-md" />
        </div>
      </div>
    </div>
  )

  const ErrorState = ({ message, onRetry }) => (
    <div className="col-span-full py-10 flex flex-col items-center justify-center glass-card rounded-3xl border border-red-500/20 bg-red-500/5">
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-2xl mb-4">⚠️</div>
      <h3 className="text-white font-semibold mb-2">Oops! Something went wrong</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-md text-center">
        {message || "We encountered an error while fetching the data. Please check your connection and try again."}
      </p>
      <button 
        onClick={onRetry}
        className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-all border border-white/10"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center hero-grid bg-hero-gradient">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-500/10 blur-[100px]" />
          <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-brand-600/8 blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-brand-500/20 text-brand-400 text-xs font-mono mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Smart Ticketing Platform
            </div>

            <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[1.05] mb-6 animate-fade-up">
              Discover &amp;{' '}
              <span className="gradient-text">Book</span>
              <br />
              Extraordinary
              <br />
              Experiences
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed" style={{ animationDelay: '0.1s' }}>
              From concerts to conferences — explore thousands of events, book instantly,
              and enter with a unique QR code. Your next great experience is one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/events"
                className="px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-semibold text-base transition-all hover:shadow-glow inline-flex items-center gap-2 justify-center"
              >
                Browse Events
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl glass-card border border-white/10 hover:border-white/20 text-white font-semibold text-base transition-all inline-flex items-center justify-center"
              >
                Create Account
              </Link>
            </div>

            {/* Search bar */}
            <div className="mt-10 flex items-center gap-3 p-2 pl-5 rounded-2xl glass-card border border-white/10 hover:border-brand-500/30 transition-all max-w-xl">
              <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search events, venues, artists..."
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
              />
              <Link to="/events" className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-400 transition-colors shrink-0">
                Search
              </Link>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="glass-card rounded-3xl p-6 border border-white/10 animate-float w-52">
              <div className="text-center mb-4">
                <div className="stat-number text-4xl mb-1">50K</div>
                <p className="text-slate-500 text-xs">Happy attendees</p>
              </div>
              <div className="space-y-2">
                {['Neon Nights', 'TechSummit', 'Comedy Night'].map((e, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03]">
                    <div className={`w-6 h-6 rounded-lg shrink-0 ${['bg-brand-500', 'bg-purple-500', 'bg-green-500'][i]}`} />
                    <span className="text-white text-xs truncate">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number mb-1">{stat.value}</div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-400 text-sm font-mono mb-2">// BROWSE BY</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Event Categories</h2>
          </div>
          <Link to="/events" className="text-brand-400 text-sm hover:text-brand-300 transition-colors hidden md:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categoriesLoading ? (
            Array(6).fill(0).map((_, i) => <CategorySkeleton key={i} />)
          ) : categoriesError ? (
            <ErrorState 
              message={categoriesError?.message || categoriesError} 
              onRetry={() => dispatch(fetchCategories())} 
            />
          ) : (
            categoryList?.categories?.map((cat, i) => (
              <Link
                key={i}
                to={`/events?category=${cat.categoryName}`}
                className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center gap-2 text-center group"
              >
                <span className="text-white text-sm font-medium">{cat.categoryName}</span>
                <span className="text-slate-600 text-xs font-mono line-clamp-1">{cat.description}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ── Events ── */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-400 text-sm font-mono mb-2">// HANDPICKED</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Featured Events</h2>
            </div>
            <Link to="/events" className="text-brand-400 text-sm hover:text-brand-300 transition-colors hidden md:block">
              View all events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {eventsLoading ? (
              Array(4).fill(0).map((_, i) => <EventSkeleton key={i} />)
            ) : eventsError ? (
              <ErrorState 
                message={eventsError?.message || eventsError} 
                onRetry={() => dispatch(fetchEvents())} 
              />
            ) : (
              eventList?.events?.map(event => (
                <EventCard key={event._id} event={event} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-brand-400 text-sm font-mono mb-2">// HOW IT WORKS</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Book in 3 Simple Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-brand-500/50 to-purple-500/50" />

          {[
            { step: '01', title: 'Find Your Event', desc: 'Browse thousands of events filtered by category, location, or date.', icon: '🔍' },
            { step: '02', title: 'Book & Pay', desc: 'Select your tickets, complete payment securely with multiple options.', icon: '💳' },
            { step: '03', title: 'Enter with QR', desc: 'Get a unique QR code for each ticket. Scan at the venue entry gate.', icon: '📱' },
          ].map((step, i) => (
            <div key={i} className="glass-card rounded-3xl p-8 border border-white/[0.06] relative text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-2xl mx-auto mb-4">
                {step.icon}
              </div>
              <div className="absolute top-6 right-6 font-mono text-xs text-brand-500/40 font-bold">{step.step}</div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-animate rounded-3xl p-px">
            <div className="rounded-3xl bg-dark-800 p-12 text-center">
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
                Ready to Experience{' '}
                <span className="gradient-text">More?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ event-goers who trust EventIQ for seamless experiences.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-all hover:shadow-glow"
              >
                Get Started Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
