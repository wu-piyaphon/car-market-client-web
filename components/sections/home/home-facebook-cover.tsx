"use client";

export default function HomeFacebookCover() {
  return (
    <div className="flex">
      <iframe
        title="GoodCarMarket Facebook Page"
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftaladrodrayong1&tabs=timeline&width=260&height=740&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="260"
        height="740"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="overflow-hidden border-none"
      />
    </div>
  );
}
