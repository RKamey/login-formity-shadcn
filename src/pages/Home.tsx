import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Activity, 
  CreditCard, 
  DollarSign, 
  Users 
} from "lucide-react"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

const dashboardData = {
  stats: [
    { 
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, 
      title: "Total Revenue", 
      value: "$45,231.89" 
    },
    { 
      icon: <Users className="h-4 w-4 text-muted-foreground" />, 
      title: "Subscribers", 
      value: "12,234" 
    },
    { 
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />, 
      title: "Sales", 
      value: "273" 
    },
    { 
      icon: <Activity className="h-4 w-4 text-muted-foreground" />, 
      title: "Active Now", 
      value: "573" 
    }
  ],
  revenueData: [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 }
  ],
  recentSales: [
    { 
      name: "Olivia Martin", 
      email: "olivia.martin@email.com", 
      amount: "+$1,999.00" 
    },
    { 
      name: "Jackson Lee", 
      email: "jackson.lee@email.com", 
      amount: "+$1,299.00" 
    },
    { 
      name: "Isabella Nguyen", 
      email: "isabella.nguyen@email.com", 
      amount: "+$998.00" 
    }
  ]
}

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <span className="text-primary">DataPulse</span>
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Analytics
          </a>
        </nav>
        <Button variant="outline" size="icon" className="ml-auto">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>ON</AvatarFallback>
          </Avatar>
        </Button>
      </header>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardData.stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentSales.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{sale.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {sale.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{sale.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Home;