import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function CourseSetting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Setting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload Course Image</Label>
          <Input type="file" accept="image/*" />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSetting;
