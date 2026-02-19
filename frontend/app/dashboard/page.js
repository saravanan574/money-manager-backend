
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function DashboardOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">128</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Applied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">32</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">More content here...</h2>
        <p>This is a placeholder for the rest of the dashboard content.</p>
      </div>
    </div>
  );
}
