import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import RantsFeed from "@/pages/RantsFeed";
import Leaderboard from "@/pages/Leaderboard";
import LeaveARant from "@/pages/LeaveARant";
import RedVsBlue from "@/pages/RedVsBlue";
import AdminDashboard from "@/pages/AdminDashboard";
import TermsOfUse from "@/pages/TermsOfUse";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/rants" component={RantsFeed} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/leave-a-rant" component={LeaveARant} />
        <Route path="/arena" component={RedVsBlue} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/terms" component={TermsOfUse} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/community-guidelines" component={CommunityGuidelines} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
