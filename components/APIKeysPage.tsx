import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Copy, Eye, EyeOff, Trash2, Plus, Key, CheckCircle } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
}

export function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'xxxxxxxxxxxyyyyyyyyyyyyyyyyy',
      created: '2025-11-15',
      lastUsed: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'xxxxxxxxxxxyyyyyyyyyyyyyyyyy',
      created: '2025-11-10',
      lastUsed: '1 day ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Staging API Key',
      key: 'xxxxxxxxxxxyyyyyyyyyyyyyyyyy',
      created: '2025-10-28',
      lastUsed: 'Never',
      status: 'inactive'
    }
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCreateKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 42)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };
    setApiKeys([...apiKeys, newKey]);
    setNewlyCreatedKey(newKey.key);
    setNewKeyName('');
    setShowCreateModal(false);
  };

  const handleDeleteKey = () => {
    if (selectedKeyId) {
      setApiKeys(apiKeys.filter(key => key.id !== selectedKeyId));
      setSelectedKeyId(null);
      setShowDeleteModal(false);
    }
  };

  const maskKey = (key: string) => {
    return key.substring(0, 10) + '••••••••••••••••••••' + key.substring(key.length - 4);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-neutral-100">API Keys</h1>
            <p className="text-neutral-400">Manage your OmniBeam API keys</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create API Key
          </Button>
        </div>
      </div>

      {/* Newly Created Key Banner */}
      {newlyCreatedKey && (
        <Card className="mb-6 border-emerald-500/20 bg-emerald-500/5">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-neutral-100">API Key Created Successfully</h4>
                <p className="text-sm text-neutral-400 mb-3">
                  Make sure to copy your API key now. You won&apos;t be able to see it again!
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-emerald-400">
                    {newlyCreatedKey}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(newlyCreatedKey)}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setNewlyCreatedKey(null)}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                ×
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => {
          const isVisible = visibleKeys.has(apiKey.id);

          return (
            <Card key={apiKey.id}>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Key className="w-5 h-5 text-[#4F46E5]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-neutral-100">{apiKey.name}</h4>
                        <Badge variant={apiKey.status === 'active' ? 'success' : 'default'}>
                          {apiKey.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <code className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-neutral-300 font-mono">
                          {isVisible ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                        >
                          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span>Created {apiKey.created}</span>
                        <span>•</span>
                        <span>Last used {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedKeyId(apiKey.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Danger Zone */}
      <Card className="mt-8 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-1 text-neutral-100">Revoke All API Keys</h4>
              <p className="text-sm text-neutral-400">
                This will immediately revoke all active API keys. This action cannot be undone.
              </p>
            </div>
            <Button variant="danger" size="sm">
              Revoke All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create API Key Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewKeyName('');
        }}
        title="Create New API Key"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKeyName}>
              Create Key
            </Button>
          </>
        }
      >
        <Input
          label="Key Name"
          placeholder="e.g., Production API Key"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
        />
        <p className="mt-3 text-sm text-neutral-400">
          Choose a descriptive name to help you identify this key later.
        </p>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedKeyId(null);
        }}
        title="Delete API Key"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteKey}>
              Delete Key
            </Button>
          </>
        }
      >
        <p className="text-neutral-300">
          Are you sure you want to delete this API key? This action cannot be undone and may break integrations using this key.
        </p>
      </Modal>
    </div>
  );
}
