"use client"

import { useState, useEffect } from "react"
import { Bell, BarChart2, FileText, Plus, Tag, UtensilsCrossed, LogOut, ChevronDown,  Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/switch"

type User = {
  id: string
  name: string
  avatar: string
  email?: string
  phone?: string
  joinDate?: string
}

type Restaurant = {
  id: string
  name: string
  cuisine: string
  rating: number
  status: 'active' | 'inactive'
}

type Coupon = {
  id: string
  code: string
  discount: string
  validUntil: string
  status: 'active' | 'expired'
}

type LanguageOption = {
  code: string
  name: string
  flag: string
}

type MenuItem = {
  title: string
  icon: React.ReactNode
  path: string
  active: boolean
}

export default function Dashboard() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    code: "en",
    name: "English",
    flag: "/flags/us.svg"
  })
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('users')

  const languages: LanguageOption[] = [
    { code: "en", name: "English", flag: "/flags/us.svg" },
    { code: "es", name: "Spanish", flag: "/flags/es.svg" },
    { code: "fr", name: "French", flag: "/flags/fr.svg" },
    { code: "de", name: "German", flag: "/flags/de.svg" },
    { code: "hi", name: "Hindi", flag: "/flags/in.svg" },
  ]

  const users: User[] = [
    { 
      id: "#223448", 
      name: "Lithium bils", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "lithium@example.com",
      phone: "+1 234 567 890",
      joinDate: "2023-01-15"
    },
    { 
      id: "#223449", 
      name: "Marco mala", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "marco@example.com",
      phone: "+1 345 678 901",
      joinDate: "2023-02-20"
    },
    { 
      id: "#223450", 
      name: "Tiffsn tipu", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "tiffsn@example.com",
      phone: "+1 456 789 012",
      joinDate: "2023-03-10"
    },
    { 
      id: "#223451", 
      name: "John Doe", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john@example.com",
      phone: "+1 567 890 123",
      joinDate: "2023-04-05"
    },
    { 
      id: "#223452", 
      name: "Jane Smith", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "jane@example.com",
      phone: "+1 678 901 234",
      joinDate: "2023-05-12"
    },
    { 
      id: "#223453", 
      name: "Robert Johnson", 
      avatar: "/placeholder.svg?height=40&width=40",
      email: "robert@example.com",
      phone: "+1 789 012 345",
      joinDate: "2023-06-18"
    },
  ]

  const restaurants: Restaurant[] = [
    { id: "R001", name: "Gourmet Paradise", cuisine: "International", rating: 4.5, status: 'active' },
    { id: "R002", name: "Pizza Haven", cuisine: "Italian", rating: 4.2, status: 'active' },
    { id: "R003", name: "Sushi World", cuisine: "Japanese", rating: 4.7, status: 'active' },
    { id: "R004", name: "Burger Joint", cuisine: "American", rating: 3.9, status: 'inactive' },
    { id: "R005", name: "Curry House", cuisine: "Indian", rating: 4.3, status: 'active' },
  ]

  const coupons: Coupon[] = [
    { id: "C001", code: "SUMMER20", discount: "20%", validUntil: "2023-08-31", status: 'active' },
    { id: "C002", code: "WELCOME10", discount: "10%", validUntil: "2023-12-31", status: 'active' },
    { id: "C003", code: "FREESHIP", discount: "Free Delivery", validUntil: "2023-07-15", status: 'active' },
    { id: "C004", code: "HOLIDAY25", discount: "25%", validUntil: "2022-12-31", status: 'expired' },
  ]

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/dashboard",
      active: activeSection === 'dashboard'
    },
    {
      title: "User list",
      icon: <FileText className="h-5 w-5" />,
      path: "/users",
      active: activeSection === 'users'
    },
    {
      title: "Add item",
      icon: <Plus className="h-5 w-5" />,
      path: "/add-item",
      active: activeSection === 'add-item'
    },
    {
      title: "Offer coupons",
      icon: <Tag className="h-5 w-5" />,
      path: "/coupons",
      active: activeSection === 'coupons'
    },
    {
      title: "Restaurants",
      icon: <UtensilsCrossed className="h-5 w-5" />,
      path: "/restaurants",
      active: activeSection === 'restaurants'
    },
  ]

  const toggleUserDetails = (index: number) => {
    setShowUserDetails(showUserDetails === index ? null : index)
  }

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language)
    setShowLanguageDropdown(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const navigateToSection = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize() // Set initial state
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-300`}>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white dark:bg-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 border-r ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"} flex-shrink-0 z-40 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/myoutlet.logo.png"
              alt="myoutlet logo"
              width={120}
              height={40}
              className="h-10"
            />
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigateToSection(item.path.substring(1))}
                  className={`flex items-center w-full p-3 rounded-md transition-all duration-200 ${
                    item.active 
                      ? (darkMode ? "bg-yellow-500 text-black" : "bg-yellow-400 text-black") 
                      : (darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100")
                  } ${item.active ? 'font-medium' : ''}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`h-16 border-b ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"} flex items-center justify-between px-4 md:px-6 sticky top-0 z-30`}
        >
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  6
                </span>
              </button>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center border rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <Image
                  src={selectedLanguage.flag}
                  alt={selectedLanguage.name}
                  width={20}
                  height={15}
                  className="h-4 w-6 mr-2 object-cover rounded-sm"
                />
                <span className="text-sm">{selectedLanguage.name}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {showLanguageDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} ring-1 ring-black ring-opacity-5 z-50`}>
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`block px-4 py-2 text-sm w-full text-left ${selectedLanguage.code === language.code ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""} hover:${darkMode ? "bg-gray-700" : "bg-gray-100"} transition-colors duration-200`}
                        onClick={() => handleLanguageChange(language)}
                      >
                        <div className="flex items-center">
                          <Image
                            src={language.flag}
                            alt={language.name}
                            width={20}
                            height={15}
                            className="h-4 w-6 mr-2 object-cover rounded-sm"
                          />
                          {language.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm hidden sm:inline">Dark mode</span>
              <Switch 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode} 
                className={`${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
              />
            </div>
            
            <button 
              className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => router.push('/logout')}
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeSection === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h3 className="text-lg font-medium mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-yellow-500">1,248</p>
                  <p className="text-sm text-green-500 mt-2">↑ 12% from last month</p>
                </div>
                <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h3 className="text-lg font-medium mb-2">Active Restaurants</h3>
                  <p className="text-3xl font-bold text-yellow-500">84</p>
                  <p className="text-sm text-green-500 mt-2">↑ 5% from last month</p>
                </div>
                <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h3 className="text-lg font-medium mb-2">Active Coupons</h3>
                  <p className="text-3xl font-bold text-yellow-500">23</p>
                  <p className="text-sm text-red-500 mt-2">↓ 2% from last month</p>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 mr-3"></div>
                        <div>
                          <p className="font-medium">Activity {item}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-sm text-yellow-500 hover:text-yellow-600">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User list</h1>
                <button 
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors duration-200"
                  onClick={() => router.push('/users/add')}
                >
                  Add New User
                </button>
              </div>

              <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300`}>
                <div className="grid grid-cols-3 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500 dark:text-gray-400 font-medium">User name</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">User ID</div>
                  <div></div>
                </div>

                {users.map((user, index) => (
                  <div key={index}>
                    <div
                      className={`grid grid-cols-3 p-4 items-center border-b last:border-0 border-gray-200 dark:border-gray-700 hover:${darkMode ? "bg-gray-700" : "bg-gray-50"} transition-colors duration-200 cursor-pointer`}
                      onClick={() => toggleUserDetails(index)}
                    >
                      <div className="flex items-center">
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                        <span>{user.name}</span>
                      </div>
                      <div>{user.id}</div>
                      <div className="flex justify-end">
                        <button 
                          className="px-4 py-1 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/users/${user.id}`)
                          }}
                        >
                          View details
                        </button>
                      </div>
                    </div>
                    
                    {showUserDetails === index && (
                      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${darkMode ? "bg-gray-750" : "bg-gray-50"} animate-fadeIn`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                            <p>{user.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                            <p>{user.phone}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</h3>
                            <p>{user.joinDate}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'add-item' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
              <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="itemName" className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                      type="text"
                      id="itemName"
                      className={`w-full p-3 rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="itemCategory" className="block text-sm font-medium mb-1">Category</label>
                    <select
                      id="itemCategory"
                      className={`w-full p-3 rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    >
                      <option value="">Select a category</option>
                      <option value="food">Food</option>
                      <option value="drink">Drink</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="itemPrice" className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      id="itemPrice"
                      className={`w-full p-3 rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      placeholder="Enter price"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="itemDescription" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      id="itemDescription"
                      rows={4}
                      className={`w-full p-3 rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      placeholder="Enter item description"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="itemImage" className="block text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Plus className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                        </div>
                        <input id="itemImage" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors duration-200"
                    >
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'coupons' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Offer Coupons</h1>
                <button 
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors duration-200"
                  onClick={() => router.push('/coupons/add')}
                >
                  Create Coupon
                </button>
              </div>

              <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300`}>
                <div className="grid grid-cols-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Coupon ID</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Code</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Discount</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Status</div>
                </div>

                {coupons.map((coupon, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-4 p-4 items-center border-b last:border-0 border-gray-200 dark:border-gray-700 hover:${darkMode ? "bg-gray-700" : "bg-gray-50"} transition-colors duration-200`}
                  >
                    <div>{coupon.id}</div>
                    <div className="font-mono">{coupon.code}</div>
                    <div>{coupon.discount}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        coupon.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {coupon.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'restaurants' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Restaurants</h1>
                <button 
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors duration-200"
                  onClick={() => router.push('/restaurants/add')}
                >
                  Add Restaurant
                </button>
              </div>

              <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} transition-all duration-300`}>
                <div className="grid grid-cols-5 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500 dark:text-gray-400 font-medium">ID</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Name</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Cuisine</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Rating</div>
                  <div className="text-gray-500 dark:text-gray-400 font-medium">Status</div>
                </div>

                {restaurants.map((restaurant, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-5 p-4 items-center border-b last:border-0 border-gray-200 dark:border-gray-700 hover:${darkMode ? "bg-gray-700" : "bg-gray-50"} transition-colors duration-200`}
                  >
                    <div>{restaurant.id}</div>
                    <div className="font-medium">{restaurant.name}</div>
                    <div>{restaurant.cuisine}</div>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {restaurant.rating}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        restaurant.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {restaurant.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}