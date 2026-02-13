import { loadFile as i } from "./load_file-B0HhZ2w7.js";
class s extends HTMLElement {
  constructor() {
    super(), this.shadow = this.attachShadow({ mode: "open" });
    const g = new URL("data:text/html;base64,PGRpdiBjbGFzcz0ib3ZlcmxheSI+CiAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiPgogICAgICAgIDxkaXYgaWQ9ImRpYWxvZy1jb250ZW50Ij48L2Rpdj4KICAgIDwvZGl2Pgo8L2Rpdj4K", import.meta.url).href, I = new URL("data:text/css;base64,Lm92ZXJsYXkgewogICAgcG9zaXRpb246IGZpeGVkOwogICAgaW5zZXQ6IDA7CiAgICBkaXNwbGF5OiBub25lOyAvKiBjYWNow6kgcGFyIGTDqWZhdXQgKi8KICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMzUpOyAvKiBhc3NvbWJyaXNzZW1lbnQgKi8KICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cig4cHgpOyAgICAgICAvKiBmbG91ICovCiAgICB6LWluZGV4OiAyMDAwOyAgICAgICAgICAgICAgICAgICAvKiBhdS1kZXNzdXMgZGUgdG91dCAqLwp9Cgoub3ZlcmxheS52aXNpYmxlIHsKICAgIGRpc3BsYXk6IGZsZXg7Cn0KCi5jb250YWluZXIgewogICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTsKICAgIHBhZGRpbmc6IDMwcHg7CiAgICBib3JkZXItcmFkaXVzOiAxOHB4OwogICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEycHgpOwogICAgYm94LXNoYWRvdzogMCAxMHB4IDQwcHggcmdiYSgwLDAsMCwwLjMpOwogICAgYW5pbWF0aW9uOiBmYWRlSW4gMC4yNXMgZWFzZTsKfQoKQGtleWZyYW1lcyBmYWRlSW4gewogICAgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH0KICAgIHRvICAgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9Cn0K", import.meta.url).href;
    i(g, I, this.shadow).then(() => {
      this.overlay = this.shadow.querySelector(".overlay"), this.container = this.shadow.querySelector(".container"), this.overlay.addEventListener("click", (e) => {
        e.target === this.overlay && this.close();
      }), this.dispatchEvent(new Event("ready"));
    });
  }
  open() {
    this.overlay?.classList.add("visible");
  }
  close() {
    this.overlay?.classList.remove("visible");
  }
}
customElements.define("aws-context", s);
