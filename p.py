from datetime import datetime

# Data
data = [
    {"PDate": "2024-12-29", "PTime": "20:07:22", "SDate": "2024-12-30", "STime": "19:13:41"},
    {"PDate": "2024-12-29", "PTime": "16:20:04", "SDate": "2024-12-31", "STime": "14:37:16"},
    {"PDate": "2024-12-29", "PTime": "15:16:23", "SDate": "2024-12-31", "STime": "14:24:38"},
]

# Calculate downtime
for record in data:
    # Combine date and time into timestamps
    problem_time = datetime.strptime(f"{record['PDate']} {record['PTime']}", "%Y-%m-%d %H:%M:%S")
    solving_time = datetime.strptime(f"{record['SDate']} {record['STime']}", "%Y-%m-%d %H:%M:%S")
    
    # Calculate downtime
    downtime = solving_time - problem_time
    downtime_in_hours = downtime.total_seconds() / 3600
    
    # Display result
    print(f"Downtime: {downtime} ({downtime_in_hours:.2f} hours)")
