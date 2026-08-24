import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const summaryCards = [
  { label: "전체 아롬인", value: "-" },
  { label: "진행 중인 프로젝트", value: "-" },
  { label: "리크루팅 지원자", value: "-" },
  { label: "이번 주 스터디 로그", value: "-" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">개요</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{card.value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
