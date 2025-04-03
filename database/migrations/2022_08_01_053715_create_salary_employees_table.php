<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_employees', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id');
            $table->string('employee_name');
            $table->string('designation');
            $table->string('department');
            $table->string('present');
            $table->string('absent');
            $table->string('leave');
            $table->double('basic_pay');
            $table->double('net_pay');
            $table->bigInteger('salary_grade_id');
            $table->string('salary_month');
            $table->string('addition');
            $table->string('deduction');
            $table->bigInteger('subscriber_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salary_employees');
    }
}
