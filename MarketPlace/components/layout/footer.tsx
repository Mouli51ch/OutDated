export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-[#4099B4]/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} OutDated. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white/70 hover:text-[#4099B4] transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-[#4099B4] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-[#4099B4] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
