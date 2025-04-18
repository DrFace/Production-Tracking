import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, Divider } from '@mui/material';
import { DashboardData, dashboardData } from '../data/dashboardData'; // Import your data

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(dashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {loading ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="primary" />
        </Grid>
      ) : data.length > 0 ? (
        data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{
              bgcolor: "background.paper",
              borderRadius: "16px",
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              '&:hover': { transform: "translateY(-4px)" },
              minHeight: 200
            }}>
              <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ 
                  position: "absolute",
                  top: -24,
                  right: 16,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.3)"
                }}>
                  <Typography variant="h5" fontWeight={800}>
                    {item.value}
                  </Typography>
                </Box>

                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                
                <Divider sx={{ mb: 2 }} />

                <Box component="ul" sx={{ 
                  pl: 2,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  '& li': {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem"
                  }
                }}>
                  {item.metrics.map((metric, index) => (
                    <Box component="li" key={index} sx={{ 
                      color: metric.highlight ? "primary.main" : "text.primary",
                      fontWeight: metric.highlight ? 600 : 400
                    }}>
                      <span>{metric.label}</span>
                      <span>{metric.value}</span>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ 
                  mt: 'auto',
                  pt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {item.timestamp && `Last updated: ${item.timestamp}`}
                  </Typography>
                  {item.status && (
                    <Box sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: item.status === "active" ? "success.main" : "error.main"
                    }} />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" color="text.secondary">
            No Data Available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;