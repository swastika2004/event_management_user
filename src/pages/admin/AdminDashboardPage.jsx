import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="glass-card rounded-2xl p-5 border border-white/[0.06]">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-xl`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
        {change}
      </span>
    </div>
    <div className="stat-number text-3xl mb-0.5">{value}</div>
    <p className="text-slate-500 text-sm">{title}</p>
  </div>
)

const MiniBar = ({ pct, color }) => (
  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
  </div>
)

export default function AdminDashboardPage() {
  const { eventList } = useSelector(s => s.event)
  const events = Array.isArray(eventList?.events) ? eventList.events : [];
  const { bookings } = useSelector(s => s.booking)

  const totalRevenue = bookings.reduce((s, b) => s + b.totalAmount, 0)

  return (
    <div>
      <div className="mb-8">
        <p className="text-slate-500 text-sm font-mono mb-1">Sunday, March 01, 2026</p>
        <h1 className="font-display font-bold text-3xl text-white">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} change="+12%" icon="💰" color="bg-brand-500/10" />
        <StatCard title="Total Bookings" value={bookings.length.toString()} change="+8%" icon="🎟️" color="bg-purple-500/10" />
        <StatCard title="Active Events" value={events.length.toString()} change="+3" icon="📅" color="bg-blue-500/10" />
        <StatCard title="Total Users" value="1.2K" change="+23%" icon="👥" color="bg-green-500/10" />
      </div>

      {/* Charts placeholder row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-white">Revenue Overview</h3>
            <select className="text-xs text-slate-500 bg-dark-700 border border-white/10 px-2 py-1 rounded-lg outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          {/* Bar chart visual */}
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg bg-brand-500/40 hover:bg-brand-500/70 transition-all" style={{ height: `${h}%` }} />
                <span className="text-slate-600 text-xs">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/[0.06]">
          <h3 className="font-semibold text-white mb-5">Bookings by Category</h3>
          <div className="space-y-3">
            {[
              { name: 'Music', pct: 38, color: 'bg-pink-500' },
              { name: 'Tech', pct: 27, color: 'bg-blue-500' },
              { name: 'Sports', pct: 18, color: 'bg-brand-500' },
              { name: 'Comedy', pct: 12, color: 'bg-green-500' },
              { name: 'Other', pct: 5, color: 'bg-purple-500' },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{c.name}</span>
                  <span className="text-white font-medium">{c.pct}%</span>
                </div>
                <MiniBar pct={c.pct} color={c.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-white/[0.06]">
          <h3 className="font-semibold text-white">Recent Events</h3>
          <Link to="/admin/events" className="text-brand-400 text-sm hover:text-brand-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['Event', 'Category', 'Date', 'Tickets', 'Revenue', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs text-slate-500 font-medium px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 5).map(e => {
                const categoryName = typeof e.category === 'object' && e.category !== null 
                  ? e.category.categoryName 
                  : (e.category || 'General');

                return (
                  <tr key={e._id} className="border-b border-white/[0.03]">
                    <td className="px-5 py-3 text-sm text-white font-medium">{e.eventName}</td>
                    <td className="px-5 py-3">
                      <span className="tag-badge">{categoryName}</span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400">
                      {new Date(e.eventDate || e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400">{e.availableSeats}/{e.totalSeats}</td>
                    <td className="px-5 py-3 text-sm text-white">₹{((e.price || 0) * ((e.totalSeats || 0) - (e.availableSeats || 0))).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{e.status || 'Active'}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
