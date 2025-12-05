"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Mail, MessageSquare, Bell, Smartphone, ChevronDown, ChevronRight, Filter } from 'lucide-react';

interface LogEntry {
  id: string;
  channel: 'email' | 'slack' | 'push' | 'sms';
  status: 'success' | 'failed' | 'retrying' | 'pending';
  attempts: number;
  recipient: string;
  timestamp: string;
  message: string;
  providerResponse?: any;
}

export function LogsPage() {
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const logs: LogEntry[] = [
    {
      id: '1',
      channel: 'email',
      status: 'success',
      attempts: 1,
      recipient: 'user@example.com',
      timestamp: '2025-12-05 14:32:15',
      message: 'Welcome to OmniBeam',
      providerResponse: {
        messageId: 'msg_abc123',
        status: 'delivered',
        provider: 'resend'
      }
    },
    {
      id: '2',
      channel: 'slack',
      status: 'success',
      attempts: 1,
      recipient: '#engineering',
      timestamp: '2025-12-05 14:28:42',
      message: 'Deployment completed successfully',
      providerResponse: {
        ok: true,
        channel: 'C01234567',
        ts: '1733409522.123456'
      }
    },
    {
      id: '3',
      channel: 'push',
      status: 'retrying',
      attempts: 2,
      recipient: 'device_xyz789',
      timestamp: '2025-12-05 14:25:08',
      message: 'New comment on your post',
      providerResponse: {
        error: 'Temporary network error',
        nextRetry: '2025-12-05 14:26:08'
      }
    },
    {
      id: '4',
      channel: 'sms',
      status: 'success',
      attempts: 1,
      recipient: '+1 (555) 123-4567',
      timestamp: '2025-12-05 14:20:33',
      message: 'Your verification code is 123456',
      providerResponse: {
        sid: 'SM1234567890abcdef',
        status: 'sent',
        price: '0.0075'
      }
    },
    {
      id: '5',
      channel: 'email',
      status: 'failed',
      attempts: 3,
      recipient: 'invalid@domain.com',
      timestamp: '2025-12-05 14:15:11',
      message: 'Password reset request',
      providerResponse: {
        error: 'Recipient email address is invalid',
        code: 'INVALID_EMAIL'
      }
    },
    {
      id: '6',
      channel: 'slack',
      status: 'pending',
      attempts: 0,
      recipient: '@john.doe',
      timestamp: '2025-12-05 14:10:45',
      message: 'Task assigned to you',
      providerResponse: null
    },
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return { Icon: Mail, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10' };
      case 'slack': return { Icon: MessageSquare, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10' };
      case 'push': return { Icon: Bell, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' };
      case 'sms': return { Icon: Smartphone, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10' };
      default: return { Icon: Mail, color: 'text-muted-foreground', bg: 'bg-muted/50' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'failed': return 'error';
      case 'retrying': return 'warning';
      case 'pending': return 'pending';
      default: return 'default';
    }
  };

  const filteredLogs = logs.filter(log => {
    if (channelFilter !== 'all' && log.channel !== channelFilter) return false;
    if (statusFilter !== 'all' && log.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-foreground text-2xl font-bold">Delivery Logs</h1>
        <p className="text-muted-foreground">Real-time notification tracking and monitoring</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center gap-4 flex-wrap p-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>

          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="retrying">Retrying</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {logs.length} logs
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => {
            const { Icon, color, bg } = getChannelIcon(log.channel);
            const isExpanded = expandedRow === log.id;

            return (
              <React.Fragment key={log.id}>
                <TableRow onClick={() => setExpandedRow(isExpanded ? null : log.id)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="w-8">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <span className="capitalize text-foreground font-medium">{log.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{log.attempts}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-foreground">{log.recipient}</TableCell>
                  <TableCell className="max-w-[250px] truncate text-foreground">{log.message}</TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>

                {isExpanded && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={7} className="bg-muted/20 border-t-0">
                      <div className="py-4 px-2">
                        <h4 className="mb-3 text-foreground font-semibold">Provider Response</h4>
                        <pre className="p-4 bg-muted border border-border rounded-lg text-xs text-muted-foreground overflow-x-auto">
                          {JSON.stringify(log.providerResponse, null, 2)}
                        </pre>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}