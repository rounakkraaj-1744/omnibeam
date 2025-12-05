import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle2, Radio, AlertCircle, Mail, MessageSquare, Bell, Smartphone } from 'lucide-react';

export function DashboardHome() {
  const stats = [
    { 
      title: 'Total Notifications Sent', 
      value: '24,853', 
      change: '+12.5%',
      icon: Send,
      color: 'text-blue-400'
    },
    { 
      title: 'Delivery Success Rate', 
      value: '98.7%', 
      change: '+2.3%',
      icon: CheckCircle2,
      color: 'text-emerald-400'
    },
    { 
      title: 'Active Channels', 
      value: '4', 
      change: 'All connected',
      icon: Radio,
      color: 'text-purple-400'
    },
    { 
      title: 'Errors / Retries', 
      value: '127', 
      change: '-8.2%',
      icon: AlertCircle,
      color: 'text-amber-400'
    },
  ];

  const recentActivity = [
    {
      id: 1,
      channel: 'email',
      status: 'success',
      message: 'Welcome email sent to user@example.com',
      time: '2 minutes ago',
      icon: Mail,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10'
    },
    {
      id: 2,
      channel: 'slack',
      status: 'success',
      message: 'Deployment notification posted to #engineering',
      time: '5 minutes ago',
      icon: MessageSquare,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10'
    },
    {
      id: 3,
      channel: 'push',
      status: 'retrying',
      message: 'Push notification retry attempt 2/3',
      time: '8 minutes ago',
      icon: Bell,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    {
      id: 4,
      channel: 'sms',
      status: 'success',
      message: 'OTP sent to +1 (555) 123-4567',
      time: '12 minutes ago',
      icon: Smartphone,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10'
    },
    {
      id: 5,
      channel: 'email',
      status: 'failed',
      message: 'Failed to send to invalid@domain.com',
      time: '15 minutes ago',
      icon: Mail,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10'
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Dashboard</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">Overview of your notification activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">{stat.title}</p>
                    <h2 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{stat.value}</h2>
                    <p className="text-xs font-medium text-emerald-400">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center ${stat.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-zinc-900 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{activity.message}</p>
                      <Badge 
                        variant={
                          activity.status === 'success' ? 'success' : 
                          activity.status === 'failed' ? 'error' : 
                          'warning'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}