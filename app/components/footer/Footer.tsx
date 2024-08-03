import React from 'react'
import style from "./footer.module.css";

type Props = {}

export default function footer({}: Props) {
  return (

  <footer className={style.footer1}>
  <aside>
    <img src="/images/logo_ibv.png" alt="logo" className="h-10" />
    <p className='text-white'>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </aside>
  <nav className='text-white'>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <a href="https://www.instagram.com/imagine_beach_volley/" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.311 3.608 1.285.975.975 1.224 2.242 1.285 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.311 2.633-1.285 3.608-.975.975-2.242 1.224-3.608 1.285-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.311-3.608-1.285-.975-.975-1.224-2.242-1.285-3.608C2.175 15.634 2.163 15.254 2.163 12s.012-3.584.07-4.85c.062-1.366.311-2.633 1.285-3.608.975-.975 2.242-1.224 3.608-1.285C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.332.012 7.052.07 5.772.128 4.668.313 3.698 1.283c-.97.97-1.155 2.074-1.213 3.354C2.012 5.916 2 6.325 2 12s.012 6.084.07 7.364c.058 1.28.243 2.384 1.213 3.354.97.97 2.074 1.155 3.354 1.213 1.28.058 1.689.07 7.364.07s6.084-.012 7.364-.07c1.28-.058 2.384-.243 3.354-1.213.97-.97 1.155-2.074 1.213-3.354.058-1.28.07-1.689.07-7.364s-.012-6.084-.07-7.364c-.058-1.28-.243-2.384-1.213-3.354-.97-.97-2.074-1.155-3.354-1.213C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 0 0-6.162 6.162A6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.782-11.87a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg></a>
      <a href="https://www.youtube.com/@lateamimaginebeachvolley1466" target='_blank' rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
      <a  href="https://www.facebook.com/ImagineBV/" target='_blank' rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </nav>
</footer>


  )
}
