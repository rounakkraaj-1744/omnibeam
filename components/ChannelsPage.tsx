import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Bell, Smartphone, ExternalLink, Copy, RefreshCw } from 'lucide-react';

export function ChannelsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackConnected, setSlackConnected] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [resendKey, setResendKey] = useState('re_••••••••••••••••');
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [vapidKey] = useState('BMxQ8kR7vN2pL5tY9wH3jK6mD1sF4gP8cX2nV7bM');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-neutral-100">Channels Configuration</h1>
        <p className="text-neutral-400">Configure your notification delivery channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle>Email</CardTitle>
                  <p className="text-xs text-neutral-500 mt-1">Powered by Resend</p>
                </div>
              </div>
              <Switch 
                checked={emailEnabled} 
                onChange={setEmailEnabled}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Resend API Key"
                type="password"
                placeholder="re_••••••••••••••••"
                value={resendKey}
                onChange={(e) => setResendKey(e.target.value)}
              />
              <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-300">Status</p>
                  <p className="text-xs text-neutral-500">Connected and active</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4" />
                View Resend Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Slack Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle>Slack</CardTitle>
                  <p className="text-xs text-neutral-500 mt-1">Workspace integration</p>
                </div>
              </div>
              <Badge variant={slackConnected ? 'success' : 'default'}>
                {slackConnected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slackConnected ? (
                <>
                  <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm">
                        A
                      </div>
                      <div>
                        <p className="text-sm text-neutral-200">Acme Corp Workspace</p>
                        <p className="text-xs text-neutral-500">acme-corp.slack.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>•</span>
                      <span>Access to 12 channels</span>
                      <span>•</span>
                      <span>Connected 14 days ago</span>
                    </div>
                  </div>
                  <Button variant="danger" size="sm" className="w-full">
                    Disconnect Workspace
                  </Button>
                </>
              ) : (
                <Button className="w-full">
                  <MessageSquare className="w-4 h-4" />
                  Connect Slack Workspace
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Push Notification Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <CardTitle>Push Notifications</CardTitle>
                  <p className="text-xs text-neutral-500 mt-1">Web Push via VAPID</p>
                </div>
              </div>
              <Switch 
                checked={pushEnabled} 
                onChange={setPushEnabled}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-neutral-400 mb-2 block">
                  VAPID Public Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vapidKey}
                    readOnly
                    className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 text-sm"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(vapidKey)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <RefreshCw className="w-4 h-4" />
                  Generate New Keys
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <ExternalLink className="w-4 h-4" />
                  View Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <CardTitle>SMS</CardTitle>
                  <p className="text-xs text-neutral-500 mt-1">Powered by Twilio</p>
                </div>
              </div>
              <Switch 
                checked={smsEnabled} 
                onChange={setSmsEnabled}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Twilio Account SID"
                placeholder="AC••••••••••••••••••••••••••••••••"
                value={twilioSid}
                onChange={(e) => setTwilioSid(e.target.value)}
              />
              <Input
                label="Twilio Auth Token"
                type="password"
                placeholder="••••••••••••••••••••••••••••••••"
                value={twilioToken}
                onChange={(e) => setTwilioToken(e.target.value)}
              />
              <Button size="sm" className="w-full">
                Save Configuration
              </Button>
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4" />
                Get Twilio Credentials
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
