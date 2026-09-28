import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Disc3, Headphones, MapPin, Menu, Pause, Play, Search, X } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Afterdark })

const events = [
  { day: '04', month: 'OCT', artist: 'Mira Lune', support: 'w/ Elias Vale + N/LO', city: 'Berlin', venue: 'Kraftwerk', time: '23:30', type: 'Warehouse', price: '€28' },
  { day: '11', month: 'OCT', artist: 'Koreless', support: 'w/ Sola + Animalia', city: 'London', venue: 'Fold', time: '23:00', type: 'Club', price: '£24' },
  { day: '18', month: 'OCT', artist: 'Amor Satyr', support: 'All night long', city: 'Paris', venue: 'Virage', time: '22:30', type: 'Open air', price: '€19' },
  { day: '25', month: 'OCT', artist: 'Livwutang', support: 'w/ Ben UFO', city: 'Amsterdam', venue: 'Lofi', time: '23:59', type: 'Warehouse', price: '€31' },
]
const artists = [
  { name: 'Mira Lune', location: 'Berlin', genre: 'Hypnotic techno', initials: 'ML', className: 'artist-one', number: '01' },
  { name: 'Elias Vale', location: 'Lisbon', genre: 'Leftfield house', initials: 'EV', className: 'artist-two', number: '02' },
  { name: 'N/LO', location: 'London', genre: 'UK bass', initials: 'N/L', className: 'artist-three', number: '03' },
]
const cities = ['All cities', 'Berlin', 'London', 'Paris', 'Amsterdam']
const wave = [18,34,25,48,64,31,52,76,43,68,29,84,57,35,74,48,89,60,38,70,51,92,63,44,79,55,33,66,46,81,58,39,72,50,87,61,42,69,54,77,35,62,47,73,41,65,31,56]

function Afterdark() {
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(94)
  const [city, setCity] = useState('All cities')
  const [booking, setBooking] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setElapsed((value) => value >= 3564 ? 0 : value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [playing])
  const visibleEvents = city === 'All cities' ? events : events.filter((event) => event.city === city)
  const time = `${Math.floor(elapsed / 60).toString().padStart(2, '0')}:${(elapsed % 60).toString().padStart(2, '0')}`

  return <main>
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Afterdark home"><span className="brand-mark">A/D</span><span>AFTERDARK</span></a>
      <nav className={menu ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <a href="#events" onClick={() => setMenu(false)}>Events</a><a href="#artists" onClick={() => setMenu(false)}>Artists</a><a href="#mix" onClick={() => setMenu(false)}>Radio</a><button className="nav-search" aria-label="Search"><Search size={18}/></button>
      </nav>
      <button className="book-button" onClick={() => setBooking(true)}>Book a DJ <ArrowDownRight size={16}/></button>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="top">
      <div className="hero-kicker"><span>Independent sounds</span><span>Selected worldwide</span></div>
      <div className="hero-title-wrap"><h1>THE NIGHT<br/><em>STARTS HERE.</em></h1><p className="hero-copy">A home for forward-thinking DJs, intimate rooms, and the people who stay until the lights come on.</p></div>
      <div className="orbital-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="record"><span>AFTER<br/>DARK</span><i/></div><span className="orbit-copy">LISTEN · MOVE · REPEAT · LISTEN · MOVE · REPEAT ·</span></div>
      <div className="hero-footer"><a href="#events">Explore upcoming nights <ArrowDownRight size={20}/></a><span>EST. 2018 / BERLIN</span></div>
    </section>

    <section className="mix-section" id="mix">
      <div className="section-label"><span>01</span><p>Transmission<br/>of the week</p></div>
      <div className="mix-content">
        <div className="eyebrow"><span className="live-dot"/> AFTERDARK RADIO / 079</div><h2>Between<br/><em>the strobes</em></h2>
        <p className="mix-description">Mira Lune moves through two hours of skeletal percussion, low-slung electro, and the kind of techno that makes time disappear.</p>
        <div className="player"><button className="play-button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause mix' : 'Play mix'}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button><div className="player-main"><div className="waveform" onClick={(event) => setElapsed(Math.round((event.nativeEvent.offsetX / event.currentTarget.clientWidth) * 3564))}>{wave.map((height,index) => <i key={index} className={index / wave.length < elapsed / 3564 ? 'played' : ''} style={{height:`${height}%`}}/>)}</div><div className="time-row"><span>{time}</span><span>59:24</span></div></div></div>
        <div className="mix-meta"><span><Headphones size={17}/> 12,846 listens</span><span>Recorded live / 21.09.26</span></div>
      </div>
    </section>

    <section className="events-section" id="events">
      <div className="events-heading"><div><span className="overline">UPCOMING / AUTUMN 2026</span><h2>Find your<br/><em>next night.</em></h2></div><div className="city-filter"><MapPin size={16}/><select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Filter events by city">{cities.map((item) => <option key={item}>{item}</option>)}</select></div></div>
      <div className="event-list">{visibleEvents.map((event) => <article className="event-row" key={event.artist}><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div className="event-artist"><h3>{event.artist}</h3><p>{event.support}</p></div><div className="event-details"><span><MapPin size={14}/>{event.venue}, {event.city}</span><span><Clock3 size={14}/>{event.time}</span></div><span className="event-type">{event.type}</span><div className="event-ticket"><span>FROM {event.price}</span><button aria-label={`Tickets for ${event.artist}`}><ArrowRight/></button></div></article>)}</div>
      <button className="all-events">View all events <CalendarDays size={18}/></button>
    </section>

    <section className="artists-section" id="artists">
      <div className="section-label light"><span>03</span><p>Artists<br/>in residence</p></div>
      <div className="artists-main"><div className="artists-intro"><span className="overline">ROSTER / SELECTORS</span><h2>People with<br/><em>something to say.</em></h2><p>Selectors, producers, and obsessive diggers shaping the rooms we want to be in.</p></div>
        <div className="artist-grid">{artists.map((artist) => <article className="artist-card" key={artist.name}><div className={`artist-portrait ${artist.className}`}><span>{artist.initials}</span><small>{artist.number}</small></div><div className="artist-info"><div><h3>{artist.name}</h3><p>{artist.genre} / {artist.location}</p></div><button aria-label={`View ${artist.name}`}><ArrowDownRight/></button></div></article>)}</div>
        <div className="artist-controls"><span>03 / 12</span><div><button aria-label="Previous artists"><ChevronLeft/></button><button aria-label="Next artists"><ChevronRight/></button></div></div>
      </div>
    </section>

    <section className="newsletter"><Disc3 className="disc-icon"/><span className="overline">NO SPAM. JUST SIGNAL.</span><h2>Stay up<br/><em>past your bedtime.</em></h2><form onSubmit={(event) => {event.preventDefault();setSubmitted(true)}}>{submitted ? <div className="success-message"><Check/> You’re on the list. See you after dark.</div> : <><label><span>Email address</span><input type="email" placeholder="you@somewhere.com" required/></label><button>Join the list <ArrowRight/></button></>}</form></section>

    <footer><div className="footer-brand"><span className="brand-mark">A/D</span><strong>AFTERDARK</strong><p>Independent sounds.<br/>Selected worldwide.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#events">Events</a><a href="#artists">Artists</a><a href="#mix">Radio</a></div><div><span>FOLLOW</span><a href="#top">Instagram</a><a href="#top">SoundCloud</a><a href="#top">Resident Advisor</a></div></div><div className="footer-end"><span>© 2026 AFTERDARK</span><span>BERLIN / 52.5200° N</span><button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>BACK TO TOP ↑</button></div></footer>

    {booking && <div className="modal-backdrop" onMouseDown={() => setBooking(false)}><div className="booking-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBooking(false)} aria-label="Close"><X/></button><span className="overline">BOOKINGS / GLOBAL</span><h2 id="booking-title">Bring the right<br/><em>sound to your room.</em></h2><p>Tell us what you’re planning. Our booking team replies within two working days.</p><form onSubmit={(event) => {event.preventDefault();setSubmitted(true);setBooking(false)}}><label>Your name<input required placeholder="Name or organization"/></label><label>Email<input required type="email" placeholder="booking@venue.com"/></label><label>Event details<textarea required placeholder="City, date, venue, capacity…" rows={3}/></label><button>Send enquiry <ArrowRight/></button></form></div></div>}
  </main>
}
