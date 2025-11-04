import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { signInAction, signUpAction } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; error?: string }>;
}) {
  const params = await searchParams;
  const isSignUp = params.mode === 'signup';
  const error = params.error;

  return (
    <div className="bg-background flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={isSignUp ? signUpAction : signInAction} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
            </div>
            {error && <div className="text-sm text-red-600">{decodeURIComponent(error)}</div>}
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <form action={`/login${isSignUp ? '' : '?mode=signup'}`}>
            <button
              type="submit"
              className="text-muted-foreground hover:text-foreground text-sm"
              formAction={isSignUp ? '/login' : '/login?mode=signup'}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
