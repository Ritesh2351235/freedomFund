// Core financial ratio calculations
const calculateSavingsRate = (monthly_income, monthly_fixed_expenses) => {
  return ((monthly_income - monthly_fixed_expenses) / monthly_income) * 100;
};

const calculateEmergencyFundCoverage = (current_savings, monthly_fixed_expenses) => {
  return current_savings / monthly_fixed_expenses;
};

const calculateFinancialIndependenceNumber = (monthly_fixed_expenses, withdrawalRate = 0.04) => {
  return (monthly_fixed_expenses * 12) / withdrawalRate;
};

const calculateExpenseToIncomeRatio = (monthly_income, monthly_fixed_expenses) => {
  return (monthly_fixed_expenses / monthly_income) * 100;
};

// Wealth-building metrics
const calculateNetWorth = (current_savings, invested_amount) => {
  return current_savings + invested_amount;
};

const calculateWealthRatio = (netWorth, annual_income) => {
  return (netWorth / annual_income) * 100;
};

const calculateInvestmentRatio = (invested_amount, netWorth) => {
  return (invested_amount / netWorth) * 100;
};

// Financial health scoring
const calculateFinancialHealthScore = (metrics) => {
  let score = 0;
  
  // Emergency fund score (0-25 points)
  const emergencyFundScore = Math.min(metrics.emergencyFundCoverage * 4.17, 25);
  
  // Savings rate score (0-25 points)
  const savingsRateScore = Math.min(metrics.savingsRate, 25);
  
  // Investment ratio score (0-25 points)
  const investmentRatioScore = Math.min(metrics.investmentRatio * 0.5, 25);
  
  // Expense to income ratio score (0-25 points)
  const expenseRatioScore = Math.max(0, 25 - (metrics.expenseToIncomeRatio * 0.5));
  
  score = emergencyFundScore + savingsRateScore + investmentRatioScore + expenseRatioScore;
  
  return {
    total: score.toFixed(2),
    breakdown: {
      emergencyFund: emergencyFundScore.toFixed(2),
      savingsRate: savingsRateScore.toFixed(2),
      investmentRatio: investmentRatioScore.toFixed(2),
      expenseRatio: expenseRatioScore.toFixed(2)
    }
  };
};

// Investment allocation based on age and risk tolerance
const getInvestmentAllocation = (age, risk_tolerance) => {
  let baseStockAllocation = 100 - age;
  let adjustedStockAllocation;

  switch (risk_tolerance.toLowerCase()) {
    case 'low':
      adjustedStockAllocation = Math.max(baseStockAllocation - 20, 30);
      break;
    case 'medium':
      adjustedStockAllocation = baseStockAllocation;
      break;
    case 'high':
      adjustedStockAllocation = Math.min(baseStockAllocation + 20, 90);
      break;
    default:
      adjustedStockAllocation = baseStockAllocation;
  }

  return {
    stocks: adjustedStockAllocation,
    bonds: 100 - adjustedStockAllocation
  };
};

// Lifestyle and context metrics
const calculateLifestyleMetrics = (monthly_income, monthly_fixed_expenses, age) => {
  const discretionary_income = monthly_income - monthly_fixed_expenses;
  const lifestyle_inflation_risk = monthly_fixed_expenses / (monthly_income * 0.7);
  const retirement_timeline = 65 - age;
  
  return {
    discretionary_income,
    lifestyle_inflation_risk,
    retirement_timeline
  };
};

// Financial priorities assessment
const calculateFinancialPriorities = (metrics) => {
  const priorities = [];
  
  // Emergency Fund Priority
  if (metrics.emergencyFundCoverage < 6) {
    priorities.push({
      area: "Emergency Fund",
      urgency: metrics.emergencyFundCoverage < 3 ? "High" : "Medium",
      current: `${metrics.emergencyFundCoverage.toFixed(1)} months`,
      target: "6 months",
      gap: (6 - metrics.emergencyFundCoverage).toFixed(1)
    });
  }
  
  // Savings Rate Priority
  if (metrics.savingsRate < 20) {
    priorities.push({
      area: "Savings Rate",
      urgency: metrics.savingsRate < 10 ? "High" : "Medium",
      current: `${metrics.savingsRate.toFixed(1)}%`,
      target: "20%",
      gap: (20 - metrics.savingsRate).toFixed(1)
    });
  }
  
  // Investment Priority
  if (metrics.investmentRatio < 40) {
    priorities.push({
      area: "Investment Allocation",
      urgency: metrics.investmentRatio < 20 ? "High" : "Medium",
      current: `${metrics.investmentRatio.toFixed(1)}%`,
      target: "40%",
      gap: (40 - metrics.investmentRatio).toFixed(1)
    });
  }
  
  return priorities;
};

// Generate financial context for AI article generation
const generateFinancialContext = (userData, analysis) => {
  const lifestyle = calculateLifestyleMetrics(
    userData.monthly_income,
    userData.monthly_fixed_expenses,
    userData.age
  );
  
  const priorities = calculateFinancialPriorities(analysis.metrics);

  return {
    personal_context: {
      age: userData.age,
      life_stage: userData.age < 30 ? "Early Career" : 
                  userData.age < 45 ? "Mid Career" : 
                  userData.age < 60 ? "Late Career" : "Pre-retirement",
      retirement_timeline: lifestyle.retirement_timeline,
      risk_profile: userData.risk_tolerance
    },
    financial_snapshot: {
      monthly_income: userData.monthly_income,
      monthly_expenses: userData.monthly_fixed_expenses,
      discretionary_income: lifestyle.discretionary_income,
      current_savings: userData.current_savings,
      invested_amount: userData.invested_amount,
      net_worth: analysis.wealth_metrics.netWorth
    },
    key_metrics: {
      emergency_fund_months: analysis.core_metrics.emergencyFundCoverage,
      savings_rate: analysis.core_metrics.savingsRate,
      expense_ratio: analysis.core_metrics.expenseToIncomeRatio,
      investment_ratio: analysis.wealth_metrics.investmentRatio,
      financial_independence_number: analysis.core_metrics.financialIndependenceNumber
    },
    health_assessment: {
      overall_score: analysis.health_assessment.overallScore,
      status: analysis.health_assessment.status,
      score_breakdown: analysis.health_assessment.scoreBreakdown
    },
    improvement_areas: priorities,
    investment_advice: {
      recommended_allocation: analysis.investment_recommendation,
      lifestyle_inflation_risk: lifestyle.lifestyle_inflation_risk
    }
  };
};

// Cloudflare Worker Event Handler
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "POST") {
    try {
      const reqData = await request.json();

      const { 
        name, 
        age, 
        monthly_income, 
        monthly_fixed_expenses, 
        current_savings, 
        invested_amount,
        risk_tolerance
      } = reqData;

      if (!name || !age || !monthly_income || !monthly_fixed_expenses || !current_savings || !invested_amount || !risk_tolerance) {
        return new Response(JSON.stringify({ error: "All inputs are required" }), { status: 400 });
      }

      // Calculate core metrics
      const savingsRate = calculateSavingsRate(monthly_income, monthly_fixed_expenses);
      const emergencyFundCoverage = calculateEmergencyFundCoverage(current_savings, monthly_fixed_expenses);
      const financialIndependenceNumber = calculateFinancialIndependenceNumber(monthly_fixed_expenses);
      const expenseToIncomeRatio = calculateExpenseToIncomeRatio(monthly_income, monthly_fixed_expenses);
      
      // Calculate wealth metrics
      const netWorth = calculateNetWorth(current_savings, invested_amount);
      const annual_income = monthly_income * 12;
      const wealthRatio = calculateWealthRatio(netWorth, annual_income);
      const investmentRatio = calculateInvestmentRatio(invested_amount, netWorth);

      // Calculate health score
      const metrics = {
        emergencyFundCoverage,
        savingsRate,
        investmentRatio,
        expenseToIncomeRatio,
        wealthRatio
      };
      
      const healthScore = calculateFinancialHealthScore(metrics);
      const status = healthScore.total >= 90 ? "Excellent" :
                     healthScore.total >= 75 ? "Good" :
                     healthScore.total >= 60 ? "Fair" :
                     healthScore.total >= 40 ? "Caution" : "Warning";

      // Get investment allocation
      const { stocks: stockAllocation, bonds: bondAllocation } = getInvestmentAllocation(age, risk_tolerance);

      const analysis = {
        name,
        age,
        core_metrics: {
          savingsRate: `${savingsRate.toFixed(2)}%`,
          emergencyFundCoverage: `${emergencyFundCoverage.toFixed(2)} months`,
          financialIndependenceNumber: financialIndependenceNumber.toFixed(2),
          expenseToIncomeRatio: `${expenseToIncomeRatio.toFixed(2)}%`,
        },
        wealth_metrics: {
          netWorth: netWorth.toFixed(2),
          wealthRatio: `${wealthRatio.toFixed(2)}%`,
          investmentRatio: `${investmentRatio.toFixed(2)}%`
        },
        health_assessment: {
          overallScore: healthScore.total,
          scoreBreakdown: healthScore.breakdown,
          status: status
        },
        investment_recommendation: {
          stocks: `${stockAllocation}%`,
          bonds: `${bondAllocation}%`,
        }
      };

      // Generate context for article generation
      const articleContext = generateFinancialContext(
        { name, age, monthly_income, monthly_fixed_expenses, current_savings, invested_amount, risk_tolerance },
        { ...analysis, metrics }
      );

      return new Response(JSON.stringify({ 
        success: true, 
        analysis,
        articleContext
      }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}