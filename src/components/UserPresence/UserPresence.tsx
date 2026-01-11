import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { Badge } from '@/components/ui/Badge/Badge';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { Pencil, Check, X, Users } from 'lucide-react';
import { getUserInitials } from '@/shared/utils';
import { useCurrentTime } from '@/hooks/useCurrentTime/useCurrentTime';
import { getRelativeTime } from '@/shared/utils';
import { MAX_INITIALS } from '@/shared';

import type { User } from '@/types/collaboration';
import { Link, Stack, Typography, useTheme } from '@mui/material';

interface UserPresenceProps {
  currentUser: User;
  users: User[];
  onUpdateUsername: (name: string) => void;
}

export const UserPresence: React.FC<UserPresenceProps> = ({
  currentUser,
  users,
  onUpdateUsername,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const now = useCurrentTime();
  const theme = useTheme();

  const handleSave = () => {
    if (editName.trim() && editName !== currentUser.name) {
      onUpdateUsername(editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(currentUser.name);
    setIsEditing(false);
  };

  const otherUsers = users.filter(u => u.id !== currentUser.id);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Active Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        <Stack spacing={2} justifyContent="center">
          <Typography>You</Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            borderRadius={2}
            p={2}
            border={`1px solid ${theme.palette.grey[300]}`}
          >
            <Stack spacing={1}>
              <Avatar>{getUserInitials(currentUser.name, MAX_INITIALS)}</Avatar>
              <Badge variant="default" label="You" />
            </Stack>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Stack spacing={2}>
                  <Input
                    value={editName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditName(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') handleCancel();
                    }}
                    className="h-9 w-full"
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      className="h-8 px-3 text-xs"
                      onClick={handleSave}
                    >
                      <Check className="h-3.5 w-3.5 mr-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs"
                      onClick={handleCancel}
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                    </Button>
                  </div>
                </Stack>
              ) : (
                <Stack spacing={1.4}>
                  <Typography>{currentUser.name}</Typography>
                  <Stack alignItems="center" direction="row" spacing={0.5}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {currentUser.isTyping ? 'typing...' : 'online'}
                    </span>
                  </Stack>
                </Stack>
              )}
            </div>
          </Stack>
        </Stack>

        {otherUsers.length > 0 && (
          <Stack spacing={2}>
            <Typography className="text-sm text-muted-foreground font-medium">
              Other Tabs
            </Typography>
            <Stack spacing={2}>
              {otherUsers.map(user => (
                <Stack
                  key={user.id}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  borderRadius={2}
                  p={2}
                  border={`1px solid ${theme.palette.grey[300]}`}
                >
                  <Avatar className="h-10 w-10">
                    {getUserInitials(user.name, MAX_INITIALS)}
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Typography>{user.name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <span className="text-xs text-muted-foreground">
                        {user.isTyping
                          ? 'typing...'
                          : getRelativeTime(now, user.lastActivity)}
                      </span>
                      {user.isTyping && (
                        <Badge
                          variant="secondary"
                          className="animate-pulse text-xs h-5"
                          label="Typing"
                        />
                      )}
                    </Stack>
                  </div>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}

        {otherUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <Typography>No other tabs active</Typography>
            <Typography>
              <Link
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontWeight: 500 }}
              >
                Open this page in another tab!
              </Link>
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
