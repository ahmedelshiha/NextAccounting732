'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface OperationsMetrics {
  totalUsers: number
  pendingApprovals: number
  inProgressWorkflows: number
  dueThisWeek: number
  systemHealth?: number
}

interface OperationsOverviewCardsProps {
  metrics: OperationsMetrics
  isLoading?: boolean
}

interface MetricCardProps {
  title: string
  value: number | string
  icon: string
  description: string
  trend?: number
  isLoading?: boolean
}

/**
 * Individual metric card component
 */
function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  isLoading
}: MetricCardProps) {
  return (
    <Card className="bg-white border-gray-200 border-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <span className="text-xl">{icon}</span>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-100 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            {trend !== undefined && (
              <div
                className={`text-sm font-medium mt-2 ${
                  trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Operations Overview Cards
 * 
 * Displays key metrics for user management:
 * - Total Users
 * - Pending Approvals
 * - In-Progress Workflows
 * - Due This Week
 * 
 * Features:
 * - Responsive grid layout
 * - Loading state support
 * - Trend indicators
 * - Quick at-a-glance status
 */
export function OperationsOverviewCards({
  metrics,
  isLoading
}: OperationsOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Users"
        value={metrics.totalUsers}
        icon="👥"
        description="Active system users"
        isLoading={isLoading}
      />

      <MetricCard
        title="Pending Approvals"
        value={metrics.pendingApprovals}
        icon="⏳"
        description="Awaiting approval"
        isLoading={isLoading}
        trend={metrics.pendingApprovals > 0 ? 1 : 0}
      />

      <MetricCard
        title="In-Progress Workflows"
        value={metrics.inProgressWorkflows}
        icon="🔄"
        description="Active operations"
        isLoading={isLoading}
      />

      <MetricCard
        title="Due This Week"
        value={metrics.dueThisWeek}
        icon="📅"
        description="Upcoming deadlines"
        isLoading={isLoading}
        trend={metrics.dueThisWeek > 0 ? -1 : 0}
      />
    </div>
  )
}
