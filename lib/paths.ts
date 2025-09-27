export const paths = {
  home: "/",
  cars: {
    list: "/cars",
    detail: (slug: string) => `/cars/${slug}`,
  },
  loanCalculator: "/loan-calculator",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
  faq: "/faq",
  form: {
    selling: "/car-selling",
    estimate: "/car-valuation",
  },
};
