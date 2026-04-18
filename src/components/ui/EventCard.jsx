import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { setSelectedEvent } from '../../store/slices/EventSlice.js'

export default function EventCard({ event }) {
  const dispatch = useDispatch()
  
  const available = event.availableSeats || 0;
  const total = event.totalSeats || 1;
  const occupancy = Math.round((1 - available / total) * 100);

  const categoryName = typeof event.category === 'object' && event.category !== null 
    ? event.category.categoryName 
    : (event.category || 'General');

  const eventDateObj = new Date(event.eventDate || event.createdAt || Date.now());
  const dateStr = eventDateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = eventDateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, '') || '';
  const imageUrl = event.imageUrl
    ? (event.imageUrl.startsWith('http') || event.imageUrl.startsWith('blob')
        ? event.imageUrl
        : `${baseUrl}${event.imageUrl.startsWith('/') ? '' : '/'}${event.imageUrl}`)
    : 'https://placehold.co/600x400/1a1a1a/fff?text=No+Image';

  const categoryColors = {
    Music: 'bg-pink-500/15 text-pink-400',
    Tech: 'bg-blue-500/15 text-blue-400',
    Art: 'bg-yellow-500/15 text-yellow-400',
    Comedy: 'bg-green-500/15 text-green-400',
    Sports: 'bg-brand-500/15 text-brand-400',
    Food: 'bg-amber-500/15 text-amber-400',
  }

  return (
    <Link
      to={`/events/${event._id}`}
      // onClick={() => dispatch(setSelectedEvent(event))}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={event.eventName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/1a1a1a/fff?text=No+Image' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${Object.entries(categoryColors).find(([key]) => categoryName.includes(key))?.[1] || 'bg-white/10 text-white'}`}>
            {categoryName}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark-900/70 backdrop-blur px-2 py-1 rounded-full">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-white text-xs font-medium">{event.rating || '4.5'}</span>
        </div>
        {available < 50 && available > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-mono text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
              Only {available} left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-white text-base mb-2 line-clamp-2 leading-tight group-hover:text-brand-300 transition-colors">
          {event.eventName}
        </h3>

        <div className="space-y-1.5 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {dateStr} · {timeStr}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Occupancy bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">{available} seats left</span>
            <span className="text-xs text-slate-600">{occupancy}% booked</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${occupancy > 80 ? 'bg-red-500' : occupancy > 60 ? 'bg-brand-500' : 'bg-green-500'}`}
              style={{ width: `${occupancy}%` }}
            />
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-white font-bold text-lg">₹{(event.price || 0).toLocaleString()}</span>
            <span className="text-slate-600 text-xs ml-1">/ ticket</span>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium group-hover:bg-brand-500 group-hover:text-white transition-all">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  )
}
