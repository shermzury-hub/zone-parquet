export default function Header() {
  return (
    <header className="zp-header">
      <nav className="zp-nav">
        <a href="/" className="zp-logo">زۆن پارکێت</a>

        <ul className="zp-nav-links">
          <li><a href="/">سەرەتا</a></li>
          <li><a href="/catalog">کۆلێکشنەکان</a></li>
          <li><a href="/about">دەربارە</a></li>
          <li><a href="/contact">پەیوەندی</a></li>
        </ul>

        <div className="zp-nav-actions">
          <button className="zp-lang-btn">EN</button>
          <a href="/cart" className="zp-cart-btn">داوای نرخ</a>
        </div>
      </nav>
    </header>
  );
}