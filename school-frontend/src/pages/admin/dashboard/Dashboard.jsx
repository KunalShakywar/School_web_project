import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  ActionCard,
  activityItems,
  dashboardCards,
  noticeItems,
  Panel,
  quickActions,
  StatCard,
} from "./dashboardData.jsx";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "actions" ? "actions" : "overview";

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-5 text-gray-800 sm:p-5 lg:p-6 dark:text-gray-100">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="-mx-1 overflow-x-auto pb-1 px-1">
          <TabsList className="inline-flex min-w-full gap-1 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur sm:min-w-max dark:border-gray-700 dark:bg-white/10">
            <TabsTrigger value="overview" className="min-w-0 flex-1 px-3 py-2 text-xs sm:px-4 sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="actions" className="min-w-0 flex-1 px-3 py-2 text-xs sm:px-4 sm:text-sm">
              Quick Actions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <StatCard key={card.title} card={card} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            <Panel title="Recent Activities">
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {activityItems.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5">
                    • {item}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="School Notices">
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                {noticeItems.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5">
                    📢 {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4 outline-none">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-semibold sm:text-lg">Quick Actions</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Scroll sideways to reach more actions.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-white/10">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <ActionCard key={action.label} action={action} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;
