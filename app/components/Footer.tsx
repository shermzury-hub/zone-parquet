export default function Footer() {
  return (
    <footer className="zp-footer">
      <div className="zp-footer-inner">
        <div className="zp-footer-brand">
          <h3>زۆن پارکێت</h3>
          <p>جوانی و شکۆمەندی بۆ هەر ماڵێک</p>
        </div>
        <div className="zp-footer-contact">
          <p>
            وەتسئاپ:{" "}
            <a href="https://wa.me/9647506733630" className="zp-footer-link font-en">
              +964 750 673 3630
            </a>
          </p>
          <p>
            ئیمەیڵ:{" "}
            <a href="mailto:info@zoneparquet.com" className="zp-footer-link font-en">
              info@zoneparquet.com
            </a>
          </p>
        </div>
      </div>
      <div className="zp-footer-bottom">
        <p>© 2026 زۆن پارکێت — هەموو مافەکان پارێزراون</p>
      </div>
    </footer>
  );
}