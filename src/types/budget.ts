// Budget and financial planning types
export interface Budget {
    id: string;
    name: string;
    description?: string;
    period: BudgetPeriod;
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpenses: number;
    totalAllocated: number;
    remainingAmount: number;
    categories: BudgetCategory[];
    goals: BudgetGoal[];
    status: BudgetStatus;
    settings: BudgetSettings;
    analytics: BudgetAnalytics;
    isActive: boolean;
    isTemplate: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BudgetCategory {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    budgetedAmount: number;
    spentAmount: number;
    remainingAmount: number;
    percentageUsed: number;
    subcategories: BudgetSubcategory[];
    transactions: string[];
    type: CategoryType;
    priority: Priority;
    isEssential: boolean;
    rollover: boolean;
    alerts: CategoryAlert[];
    history: CategoryHistory[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BudgetSubcategory {
    id: string;
    name: string;
    description?: string;
    budgetedAmount: number;
    spentAmount: number;
    remainingAmount: number;
    percentageUsed: number;
    transactions: string[];
    isActive: boolean;
  }
  
  export interface BudgetGoal {
    id: string;
    title: string;
    description?: string;
    targetAmount: number;
    currentAmount: number;
    progressPercentage: number;
    targetDate: string;
    priority: Priority;
    category: string;
    type: GoalType;
    status: GoalStatus;
    milestones: GoalMilestone[];
    contributions: GoalContribution[];
    estimatedCompletionDate: string;
    monthlyTarget: number;
    isAutomatic: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GoalMilestone {
    id: string;
    title: string;
    description?: string;
    targetAmount: number;
    targetDate: string;
    completed: boolean;
    completedAt?: string;
    reward?: string;
  }
  
  export interface GoalContribution {
    id: string;
    amount: number;
    date: string;
    description?: string;
    type: ContributionType;
    source: ContributionSource;
    automatic: boolean;
  }
  
  export interface BudgetSettings {
    autoRollover: boolean;
    alertThreshold: number;
    includeTransfers: boolean;
    includeInvestments: boolean;
    weekStartDay: WeekStartDay;
    roundingMethod: RoundingMethod;
    notifications: BudgetNotificationSettings;
    categorization: CategorizationSettings;
  }
  
  export interface BudgetNotificationSettings {
    enabled: boolean;
    overspendingAlert: boolean;
    lowBalanceAlert: boolean;
    goalDeadlineAlert: boolean;
    monthlyReport: boolean;
    weeklyReport: boolean;
    thresholdPercentage: number;
  }
  
  export interface CategorizationSettings {
    autoAssign: boolean;
    defaultCategory: string;
    learnFromHistory: boolean;
    suggestCategories: boolean;
  }
  
  export interface BudgetAnalytics {
    totalSpent: number;
    totalRemaining: number;
    averageDailySpend: number;
    projectedEndAmount: number;
    savingsRate: number;
    topCategories: TopCategory[];
    spendingTrends: SpendingTrend[];
    budgetVariance: BudgetVariance;
    recommendations: BudgetRecommendation[];
  }
  
  export interface TopCategory {
    category: string;
    amount: number;
    percentage: number;
    trend: TrendDirection;
  }
  
  export interface SpendingTrend {
    period: string;
    amount: number;
    budgeted: number;
    variance: number;
    variancePercentage: number;
  }
  
  export interface BudgetVariance {
    categories: CategoryVariance[];
    totalVariance: number;
    totalVariancePercentage: number;
    positiveVariance: number;
    negativeVariance: number;
  }
  
  export interface CategoryVariance {
    category: string;
    budgeted: number;
    actual: number;
    variance: number;
    variancePercentage: number;
    trend: TrendDirection;
  }
  
  export interface BudgetRecommendation {
    id: string;
    type: RecommendationType;
    title: string;
    description: string;
    category?: string;
    suggestedAmount?: number;
    priority: Priority;
    impact: ImpactLevel;
    actionRequired: boolean;
    createdAt: string;
  }
  
  export interface CategoryAlert {
    id: string;
    type: BudgetAlertType;
    threshold: number;
    message: string;
    triggered: boolean;
    triggeredAt?: string;
    isActive: boolean;
  }
  
  export interface CategoryHistory {
    period: string;
    budgeted: number;
    spent: number;
    remaining: number;
    transactions: number;
  }
  
  export interface BudgetTemplate {
    id: string;
    name: string;
    description?: string;
    category: TemplateCategory;
    categories: TemplateBudgetCategory[];
    estimatedIncome: number;
    popularity: number;
    isRecommended: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TemplateBudgetCategory {
    name: string;
    description?: string;
    recommendedPercentage: number;
    minPercentage: number;
    maxPercentage: number;
    type: CategoryType;
    priority: Priority;
    isEssential: boolean;
    subcategories: TemplateSubcategory[];
  }
  
  export interface TemplateSubcategory {
    name: string;
    description?: string;
    recommendedPercentage: number;
  }
  
  export interface BudgetReport {
    id: string;
    budgetId: string;
    period: string;
    startDate: string;
    endDate: string;
    summary: ReportSummary;
    categoryBreakdown: BudgetCategoryBreakdown[];
    goalProgress: GoalProgress[];
    insights: BudgetInsight[];
    recommendations: BudgetRecommendation[];
    generatedAt: string;
  }
  
  export interface ReportSummary {
    totalIncome: number;
    totalExpenses: number;
    totalSavings: number;
    savingsRate: number;
    budgetAdherence: number;
    topSpendingCategory: string;
    biggestOverspend: string;
    biggestUnderspend: string;
  }
  
  export interface BudgetCategoryBreakdown {
    category: string;
    budgeted: number;
    spent: number;
    remaining: number;
    percentage: number;
    trend: TrendDirection;
    transactions: number;
  }
  
  export interface GoalProgress {
    goalId: string;
    title: string;
    progress: number;
    target: number;
    percentage: number;
    onTrack: boolean;
    daysRemaining: number;
    requiredMonthlyContribution: number;
  }
  
  export interface BudgetInsight {
    id: string;
    type: InsightType;
    title: string;
    description: string;
    value: number;
    trend: TrendDirection;
    severity: InsightSeverity;
    actionable: boolean;
    relatedCategory?: string;
  }
  
  export interface ExpensePattern {
    id: string;
    name: string;
    description: string;
    amount: number;
    frequency: PatternFrequency;
    category: string;
    confidence: number;
    nextOccurrence: string;
    variability: number;
    isActive: boolean;
  }
  
  export interface BudgetComparison {
    currentPeriod: BudgetPeriodData;
    previousPeriod: BudgetPeriodData;
    yearOverYear: BudgetPeriodData;
    variance: ComparisonVariance;
    trends: ComparisonTrend[];
  }
  
  export interface BudgetPeriodData {
    period: string;
    totalIncome: number;
    totalExpenses: number;
    totalSavings: number;
    savingsRate: number;
    topCategories: TopCategory[];
  }
  
  export interface ComparisonVariance {
    income: number;
    expenses: number;
    savings: number;
    savingsRate: number;
    categories: CategoryVariance[];
  }
  
  export interface ComparisonTrend {
    category: string;
    direction: TrendDirection;
    magnitude: number;
    significance: TrendSignificance;
  }
  
  // Enums
  export enum BudgetPeriod {
    WEEKLY = 'weekly',
    BIWEEKLY = 'biweekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    YEARLY = 'yearly',
    CUSTOM = 'custom'
  }
  
  export enum BudgetStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    PAUSED = 'paused',
    COMPLETED = 'completed',
    ARCHIVED = 'archived'
  }
  
  export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense',
    SAVINGS = 'savings',
    INVESTMENT = 'investment',
    DEBT = 'debt'
  }
  
  export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
  }
  
  export enum GoalType {
    SAVINGS = 'savings',
    DEBT_PAYOFF = 'debt_payoff',
    EXPENSE_REDUCTION = 'expense_reduction',
    INCOME_INCREASE = 'income_increase',
    INVESTMENT = 'investment',
    EMERGENCY_FUND = 'emergency_fund'
  }
  
  export enum GoalStatus {
    NOT_STARTED = 'not_started',
    IN_PROGRESS = 'in_progress',
    ON_TRACK = 'on_track',
    BEHIND = 'behind',
    COMPLETED = 'completed',
    PAUSED = 'paused',
    CANCELLED = 'cancelled'
  }
  
  export enum ContributionType {
    MANUAL = 'manual',
    AUTOMATIC = 'automatic',
    TRANSFER = 'transfer',
    WINDFALL = 'windfall'
  }
  
  export enum ContributionSource {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CASH = 'cash',
    BONUS = 'bonus',
    GIFT = 'gift',
    REFUND = 'refund'
  }
  
  export enum WeekStartDay {
    SUNDAY = 'sunday',
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday'
  }
  
  export enum RoundingMethod {
    NONE = 'none',
    ROUND_UP = 'round_up',
    ROUND_DOWN = 'round_down',
    ROUND_NEAREST = 'round_nearest'
  }
  
  export enum BudgetAlertType {
    OVERSPENDING = 'overspending',
    LOW_BALANCE = 'low_balance',
    GOAL_DEADLINE = 'goal_deadline',
    UNUSUAL_SPENDING = 'unusual_spending',
    CATEGORY_LIMIT = 'category_limit'
  }
  
  export enum RecommendationType {
    INCREASE_BUDGET = 'increase_budget',
    DECREASE_BUDGET = 'decrease_budget',
    REALLOCATE_FUNDS = 'reallocate_funds',
    CREATE_GOAL = 'create_goal',
    ADJUST_GOAL = 'adjust_goal',
    OPTIMIZE_SPENDING = 'optimize_spending'
  }
  
  export enum ImpactLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
  }
  
  export enum TemplateCategory {
    BEGINNER = 'beginner',
    FAMILY = 'family',
    STUDENT = 'student',
    PROFESSIONAL = 'professional',
    RETIREMENT = 'retirement',
    ENTREPRENEUR = 'entrepreneur'
  }
  
  export enum TrendDirection {
    UP = 'up',
    DOWN = 'down',
    STABLE = 'stable'
  }
  
  export enum InsightType {
    OVERSPENDING = 'overspending',
    UNDERSPENDING = 'underspending',
    TREND_CHANGE = 'trend_change',
    GOAL_PROGRESS = 'goal_progress',
    SAVINGS_OPPORTUNITY = 'savings_opportunity',
    EXPENSE_PATTERN = 'expense_pattern'
  }
  
  export enum InsightSeverity {
    INFO = 'info',
    WARNING = 'warning',
    CRITICAL = 'critical'
  }
  
  export enum PatternFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    YEARLY = 'yearly',
    IRREGULAR = 'irregular'
  }
  
  export enum TrendSignificance {
    MINOR = 'minor',
    MODERATE = 'moderate',
    MAJOR = 'major',
    CRITICAL = 'critical'
  }
  
  // Form types
  export interface BudgetFormData {
    name: string;
    description?: string;
    period: BudgetPeriod;
    startDate: string;
    endDate?: string;
    totalIncome: number;
    categories: BudgetCategoryFormData[];
    goals: BudgetGoalFormData[];
    settings: Partial<BudgetSettings>;
  }
  
  export interface BudgetCategoryFormData {
    name: string;
    description?: string;
    budgetedAmount: number;
    type: CategoryType;
    priority: Priority;
    isEssential: boolean;
    rollover: boolean;
    subcategories: BudgetSubcategoryFormData[];
  }
  
  export interface BudgetSubcategoryFormData {
    name: string;
    description?: string;
    budgetedAmount: number;
    isActive: boolean;
  }
  
  export interface BudgetGoalFormData {
    title: string;
    description?: string;
    targetAmount: number;
    targetDate: string;
    priority: Priority;
    category: string;
    type: GoalType;
    monthlyTarget: number;
    isAutomatic: boolean;
    milestones: GoalMilestoneFormData[];
  }
  
  export interface GoalMilestoneFormData {
    title: string;
    description?: string;
    targetAmount: number;
    targetDate: string;
    reward?: string;
  }
  
  export interface BudgetValidationErrors {
    name?: string;
    description?: string;
    period?: string;
    startDate?: string;
    endDate?: string;
    totalIncome?: string;
    categories?: BudgetCategoryValidationErrors[];
    goals?: BudgetGoalValidationErrors[];
    general?: string;
  }
  
  export interface BudgetCategoryValidationErrors {
    name?: string;
    description?: string;
    budgetedAmount?: string;
    type?: string;
    priority?: string;
    subcategories?: BudgetSubcategoryValidationErrors[];
  }
  
  export interface BudgetSubcategoryValidationErrors {
    name?: string;
    description?: string;
    budgetedAmount?: string;
  }
  
  export interface BudgetGoalValidationErrors {
    title?: string;
    description?: string;
    targetAmount?: string;
    targetDate?: string;
    priority?: string;
    category?: string;
    type?: string;
    monthlyTarget?: string;
    milestones?: GoalMilestoneValidationErrors[];
  }
  
  export interface GoalMilestoneValidationErrors {
    title?: string;
    description?: string;
    targetAmount?: string;
    targetDate?: string;
    reward?: string;
  }
  
  // Service response types
  export interface BudgetServiceResponse<T> {
    data: T;
    success: boolean;
    error?: string;
    metadata?: {
      totalCount?: number;
      page?: number;
      limit?: number;
      hasMore?: boolean;
    };
  }
  
  export interface BudgetListResponse {
    budgets: Budget[];
    templates: BudgetTemplate[];
    totalActive: number;
    totalInactive: number;
    totalTemplates: number;
    recentlyViewed: string[];
  }
  
  export interface BudgetAnalyticsResponse {
    summary: BudgetAnalyticsSummary;
    trends: BudgetTrend[];
    comparisons: BudgetComparison[];
    insights: BudgetInsight[];
    recommendations: BudgetRecommendation[];
  }
  
  export interface BudgetAnalyticsSummary {
    totalBudgets: number;
    activeBudgets: number;
    totalBudgeted: number;
    totalSpent: number;
    totalRemaining: number;
    averageSavingsRate: number;
    budgetAdherence: number;
    mostUsedCategories: string[];
    leastUsedCategories: string[];
  }
  
  export interface BudgetTrend {
    period: string;
    budgeted: number;
    spent: number;
    saved: number;
    variance: number;
    categories: CategoryTrend[];
  }
  
  export interface CategoryTrend {
    category: string;
    budgeted: number;
    spent: number;
    trend: TrendDirection;
    changePercentage: number;
  }
  
  // Filter and search types
  export interface BudgetFilters {
    status?: BudgetStatus[];
    period?: BudgetPeriod[];
    categories?: string[];
    goals?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
    amountRange?: {
      min: number;
      max: number;
    };
    isActive?: boolean;
    isTemplate?: boolean;
    sortBy?: BudgetSortBy;
    sortOrder?: SortOrder;
  }
  
  export interface BudgetSearchParams {
    query?: string;
    filters?: BudgetFilters;
    page?: number;
    limit?: number;
    includeTotals?: boolean;
    includeAnalytics?: boolean;
  }
  
  export enum BudgetSortBy {
    NAME = 'name',
    CREATED_DATE = 'created_date',
    UPDATED_DATE = 'updated_date',
    START_DATE = 'start_date',
    END_DATE = 'end_date',
    TOTAL_AMOUNT = 'total_amount',
    REMAINING_AMOUNT = 'remaining_amount',
    SAVINGS_RATE = 'savings_rate',
    BUDGET_ADHERENCE = 'budget_adherence'
  }
  
  export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
  }
  
  // Notification types
  export interface BudgetNotification {
    id: string;
    budgetId: string;
    categoryId?: string;
    goalId?: string;
    type: BudgetNotificationType;
    title: string;
    message: string;
    priority: Priority;
    isRead: boolean;
    data?: Record<string, any>;
    scheduledAt?: string;
    sentAt?: string;
    createdAt: string;
    expiresAt?: string;
  }
  
  export enum BudgetNotificationType {
    BUDGET_CREATED = 'budget_created',
    BUDGET_UPDATED = 'budget_updated',
    CATEGORY_OVERSPEND = 'category_overspend',
    CATEGORY_UNDERSPEND = 'category_underspend',
    GOAL_ACHIEVED = 'goal_achieved',
    GOAL_BEHIND = 'goal_behind',
    GOAL_DEADLINE_APPROACHING = 'goal_deadline_approaching',
    MONTHLY_REPORT = 'monthly_report',
    WEEKLY_REPORT = 'weekly_report',
    UNUSUAL_SPENDING = 'unusual_spending',
    SAVINGS_MILESTONE = 'savings_milestone',
    BUDGET_PERIOD_ENDING = 'budget_period_ending',
    BUDGET_PERIOD_STARTED = 'budget_period_started'
  }
  
  // Hook types
  export interface UseBudgetReturn {
    budgets: Budget[];
    activeBudget: Budget | null;
    loading: boolean;
    error: string | null;
    createBudget: (data: BudgetFormData) => Promise<Budget>;
    updateBudget: (id: string, data: Partial<BudgetFormData>) => Promise<Budget>;
    deleteBudget: (id: string) => Promise<void>;
    getBudget: (id: string) => Promise<Budget | null>;
    getBudgets: (filters?: BudgetFilters) => Promise<Budget[]>;
    setActiveBudget: (budget: Budget | null) => void;
    duplicateBudget: (id: string) => Promise<Budget>;
    archiveBudget: (id: string) => Promise<void>;
    restoreBudget: (id: string) => Promise<void>;
    refreshBudgets: () => Promise<void>;
  }
  
  export interface UseBudgetAnalyticsReturn {
    analytics: BudgetAnalytics | null;
    trends: BudgetTrend[];
    insights: BudgetInsight[];
    recommendations: BudgetRecommendation[];
    loading: boolean;
    error: string | null;
    refreshAnalytics: () => Promise<void>;
    getAnalytics: (budgetId: string, period?: string) => Promise<BudgetAnalytics>;
    getTrends: (budgetId: string, period?: string) => Promise<BudgetTrend[]>;
    getInsights: (budgetId: string) => Promise<BudgetInsight[]>;
    getRecommendations: (budgetId: string) => Promise<BudgetRecommendation[]>;
  }
  
  export interface UseBudgetTemplatesReturn {
    templates: BudgetTemplate[];
    loading: boolean;
    error: string | null;
    getTemplates: () => Promise<BudgetTemplate[]>;
    createBudgetFromTemplate: (templateId: string, customData?: Partial<BudgetFormData>) => Promise<Budget>;
    saveAsTemplate: (budgetId: string, templateData: Partial<BudgetTemplate>) => Promise<BudgetTemplate>;
    refreshTemplates: () => Promise<void>;
  }
  
  // Context types
  export interface BudgetContextValue {
    budgets: Budget[];
    activeBudget: Budget | null;
    loading: boolean;
    error: string | null;
    actions: {
      createBudget: (data: BudgetFormData) => Promise<Budget>;
      updateBudget: (id: string, data: Partial<BudgetFormData>) => Promise<Budget>;
      deleteBudget: (id: string) => Promise<void>;
      setActiveBudget: (budget: Budget | null) => void;
      refreshBudgets: () => Promise<void>;
    };
    analytics: {
      data: BudgetAnalytics | null;
      loading: boolean;
      error: string | null;
      refresh: () => Promise<void>;
    };
    templates: {
      data: BudgetTemplate[];
      loading: boolean;
      error: string | null;
      refresh: () => Promise<void>;
    };
  }
  
  // Utility types
  export type BudgetId = string;
  export type CategoryId = string;
  export type GoalId = string;
  export type BudgetPeriodString = keyof typeof BudgetPeriod;
  export type BudgetStatusString = keyof typeof BudgetStatus;
  export type CategoryTypeString = keyof typeof CategoryType;
  export type PriorityString = keyof typeof Priority;
  export type GoalTypeString = keyof typeof GoalType;
  export type GoalStatusString = keyof typeof GoalStatus;
  
