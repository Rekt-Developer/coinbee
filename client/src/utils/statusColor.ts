export type TStatusColor = 'green' | 'red' | 'gray' | 'gradient' | 'pomidoro' | 'red-night'

export function colorStatus(status: string): TStatusColor {
  
  switch (true) {
    case ['Active' , 'Successful' , 'Completed', 'Paid'].includes(status):
      return 'green';
    case status == 'Down' :
      return 'red';
    case ['Decline' , 'Cancelled'].includes(status):
      return 'red-night';
    case ['Pending' , 'In Progress'].includes(status):
      return 'gradient';
    case status == 'Processing':
      return 'gray';
    default:
      return 'pomidoro';
  }
}