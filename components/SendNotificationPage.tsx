import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Mail, MessageSquare, Bell, Smartphone, Send, CheckCircle } from 'lucide-react';

export function SendNotificationPage() {
  const [message, setMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['email']);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientSlack, setRecipientSlack] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const channels = [
    { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { id: 'slack', label: 'Slack', icon: MessageSquare, color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
    { id: 'push', label: 'Push', icon: Bell, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { id: 'sms', label: 'SMS', icon: Smartphone, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  ];

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(c => c !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setMessage('');
      setRecipientEmail('');
      setRecipientSlack('');
      setRecipientPhone('');
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-zinc-900 dark:text-zinc-100">Send Notification</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Dispatch notifications across multiple channels</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSend} className="space-y-6">
          {/* Channel Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  const isSelected = selectedChannels.includes(channel.id);

                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => toggleChannel(channel.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all ${isSelected
                          ? `${channel.bgColor} ${channel.borderColor}`
                          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-neutral-700'
                        }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon className={`w-6 h-6 ${isSelected ? channel.color : 'text-zinc-500'}`} />
                        <span className={`text-sm ${isSelected ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'}`}>
                          {channel.label}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className={`w-4 h-4 ${channel.color}`} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Selected:</span>
                {selectedChannels.length === 0 ? (
                  <Badge variant="default">None</Badge>
                ) : (
                  selectedChannels.map(channelId => {
                    const channel = channels.find(c => c.id === channelId);
                    return (
                      <Badge key={channelId} variant="info">
                        {channel?.label}
                      </Badge>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">
                    Message Body
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your notification message..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card>
            <CardHeader>
              <CardTitle>Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedChannels.includes('email') && (
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="user@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required={selectedChannels.includes('email')}
                  />
                )}

                {selectedChannels.includes('slack') && (
                  <Input
                    label="Slack User or Channel"
                    placeholder="@username or #channel"
                    value={recipientSlack}
                    onChange={(e) => setRecipientSlack(e.target.value)}
                    required={selectedChannels.includes('slack')}
                  />
                )}

                {selectedChannels.includes('push') && (
                  <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      Push notifications will be sent to all registered devices for this user.
                    </p>
                  </div>
                )}

                {selectedChannels.includes('sms') && (
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    required={selectedChannels.includes('sms')}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={selectedChannels.length === 0 || !message}>
              <Send className="w-4 h-4" />
              Send Notification
            </Button>
            <Button type="button" variant="ghost" size="lg">
              Save as Draft
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Notification Queued"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">Success!</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your notification has been queued and will be delivered shortly.
          </p>
        </div>
      </Modal>
    </div>
  );
}
