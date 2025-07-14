// -------------------------------------------------------------------------
// 3. NEW FILE: /src/app/[locale]/admin/(dashboard)/bookings/page.tsx
// This is the main page for managing booking requests.
// -------------------------------------------------------------------------
import { Box, Typography } from "@mui/material";
import BookingsTable from "@/components/admin/BookingsTable";

// This function runs on the server to get all bookings
async function getBookings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`, {
      cache: 'no-store', // Always fetch fresh data for the admin panel
    });
    if (!res.ok) return [];
    const data = await res.json();
    console.log("Fetched bookings:", JSON.stringify(data.bookings)); // Debugging output
    return data.bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export default async function BookingsAdminPage() {
  const bookings = await getBookings();

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Manage Booking Requests
      </Typography>
      
      <BookingsTable bookings={bookings} />
    </Box>
  );
}